import { subscribe } from "diagnostics_channel";
import Post from "../../models/post.model.js";
import { PubSub } from "graphql-subscriptions";

const pubsub = new PubSub();

const PostResolver = {
  Query: {
    getAllPosts: async () => {
      return await Post.find({}).sort({ createdAt: -1 });
    },
    getPostById: async (_, { postId }) => {
      return await Post.findById(postId);
    }
  },

  Mutation: {
    createPost: async (_, { title, subtitle, text }, { user }) => {
      if (!user) throw new Error("User Not Authorized");

      const newPost = await Post.create({
        title,
        subtitle,
        text,
        author: user._id
      });

      // "createPost" key must be that what we define in typedef
      pubsub.publish('POST_CREATED', { createPost: newPost }); // ✅ Correct key

      return newPost;
    },

    editPost: async (_, { title, subtitle, text, postId }, { user }) => {
      if (!user) throw new Error("User Not Authorized");

      const post = await Post.findById(postId);
      if (!post) throw new Error("Post Not Found");

      if (post.author.toString() !== user._id.toString()) {
        throw new Error("Not Authorized to edit this post");
      }

      post.title = title;
      post.subtitle = subtitle;
      post.text = text;

      const updatedPost = await post.save();

      // "updaatePost" key must be that what we define in typedef
      pubsub.publish('POST_UPDATED', { updatePost: updatedPost }); // ✅ Correct key

      return updatedPost;
    },

    deletePost: async (_, { postId }, { user }) => {
      if (!user) throw new Error("User Not Authorized");

      const post = await Post.findById(postId);
      if (!post) throw new Error("Post Not Found");

      if (post.author.toString() !== user._id.toString()) {
        throw new Error("Not Authorized to delete this post");
      }

      await post.remove();

      // "deletePost" key must be that what we define in typedef
      pubsub.publish('POST_DELETED', { deletePost: true }); // ✅ Correct key

      return true;
    }
  },

  Subscription: {
    createPost: {
      subscribe: (_, __, { user }) => {
        if (!user) {
          throw new Error("User Not Authorized");
        }
        console.log("User WS:", user);
        return pubsub.asyncIterator(['POST_CREATED']);
      }
    },

    updatePost: {
      subscribe: (_, __, { user }) => {
        if (!user) {
          throw new Error("User Not Authorized");
        }
        return pubsub.asyncIterator(['POST_UPDATED']);
      }
    },

    deletePost: {
      subscribe: (_, __, { user }) => {
        if (!user) {
          throw new Error("User Not Authorized");
        }
        return pubsub.asyncIterator(['POST_DELETED']);
      }
    }
  }

};

export default PostResolver;
