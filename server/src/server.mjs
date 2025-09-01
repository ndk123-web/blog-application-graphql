import express from 'express';
import resolvers from './schema/resolvers/index.js';
import typeDefs from './schema/typedefs/index.js';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { createServer } from 'http';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import cors from 'cors';
import { PubSub } from 'graphql-subscriptions';
import connectDB from './utils/db.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // load .env variables

const pubsub = new PubSub();
console.log("JWT_SECRET: ", process.env.JWT_SECRET)
console.log("MONGOURI: ", process.env.MONGODB_URI)

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();

const httpServer = createServer(app);

const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
});

const serverCleanup = useServer({
    schema,
    context: async (ctx) => {

        // FOR WEB SOCKET JWT AUTH

        // ctx.connectionParams contains data sent by client when connecting
        const token = ctx.connectionParams?.token.replace("Bearer ", ""); // or 'Authorization' based on your client

        console.log("WS token:", token);
        if (!token) {
            throw new Error("Unauthorized: No token provided");
        }

        let user;
        try {
            // Verify JWT (replace with your actual secret)
            user = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            throw new Error("Invalid or expired token");
        }

        return { user }; // available in Subscription resolvers

    }
}, wsServer);

const server = new ApolloServer({
    schema,
    introspection: true, // ✅ enable introspection
    plugins: [
        // Proper shutdown for the HTTP server
        ApolloServerPluginDrainHttpServer({ httpServer }),

        // Proper shutdown for the WebSocket server
        {
            async serverWillStart() {
                return {
                    async drainServer() {
                        await serverCleanup.dispose();
                    },
                };
            },
        },
    ],
});

async function startServer() {
    await server.start();

    // Apply CORS and JSON middleware BEFORE GraphQL middleware
    app.use(
        '/graphql',
        cors({
            origin: ['http://localhost:4000', 'http://localhost:5173', 'https://studio.apollographql.com', 'http://192.168.0.104:5173'],
            credentials: true,
            methods: ['GET', 'POST', 'OPTIONS'], // ✅ OPTIONS request allow
            allowedHeaders: ['Content-Type', 'Authorization'], // ✅ required for JWT
        }),
        express.json(),

        // jwt auth 
        expressMiddleware(server, {
            context: async ({ req }) => {
                const authHeader = req.headers?.authorization;

                if (!authHeader) {
                    console.log("Header: ", authHeader)
                    return {}; // No auth provided, but allow the request
                }

                try {
                    console.log("Header: ", authHeader)
                    const token = authHeader.replace("Bearer ", "");
                    const user = jwt.verify(token, process.env.JWT_SECRET);
                    return { user };
                } catch (err) {
                    console.log("Error: ", err)
                    return {}; // Invalid token, but allow request without user context
                }
            }
        })
    )
};

app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'GraphQL server is running' });
});

const PORT = process.env.PORT || 4000;

httpServer.listen(PORT, () => {
    connectDB().then(() => console.log("Mongodb Connected")).catch((err) => console.log("Error: ", err.message))
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
    console.log(`🔄 Subscriptions ready at ws://localhost:${PORT}/graphql`);
    console.log(`📊 Apollo Studio: https://studio.apollographql.com/dev`);
});

// Handle graceful shutdown
process.on('SIGTERM', async () => {
    console.log('SIGTERM received, shutting down gracefully');
    await server.stop();
    httpServer.close();
});

// Start the server
startServer().catch(error => {
    console.error('Error starting server:', error);
    process.exit(1);
});