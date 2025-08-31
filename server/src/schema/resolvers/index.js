import { mergeResolvers } from '@graphql-tools/merge'
import PostResolver from './post.resolver.js';
import CommentResolver from './comment.resolver.js';
import UserResolver from './user.resolver.js';

const resolvers = mergeResolvers([PostResolver,CommentResolver,UserResolver]);

export default resolvers;