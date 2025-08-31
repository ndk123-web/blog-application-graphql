import User from "./user.typedef.js";
import Post from "./post.typedef.js";
import Comment from "./comment.typedef.js";

const rootTypeDef = `#graphql
    type Query
    type Mutation
`

const typeDefs = [rootTypeDef, User, Post, Comment];

export default typeDefs;