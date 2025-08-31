import Post from "../../models/post.model.js";

const PostResolver = {
  Query: {
    getAllPosts: async () => {
      return await Post.find({}).sort({ createdAt: -1 });
    }
  },

  Mutation: {
    createPost: async (_, { title, subtitle, text }, context) => {
      const user = context?.user;
      if (!user) throw new Error("User Not Authorized");

      const newPost = await Post.create({
        title,
        subtitle,
        text,
        author: user._id
      });

      return newPost;
    },

    editPost: async (_, { title, subtitle, text, postId }, context) => {
      const user = context?.user;
      if (!user) throw new Error("User Not Authorized");

      const post = await Post.findById(postId);
      if (!post) throw new Error("Post Not Found");

      if (post.author.toString() !== user._id.toString()) {
        throw new Error("Not Authorized to edit this post");
      }

      post.title = title;
      post.subtitle = subtitle;
      post.text = text;

      return await post.save();
    },

    deletePost: async (_, { postId }, context) => {
      const user = context?.user;
      if (!user) throw new Error("User Not Authorized");

      const post = await Post.findById(postId);
      if (!post) throw new Error("Post Not Found");

      if (post.author.toString() !== user._id.toString()) {
        throw new Error("Not Authorized to delete this post");
      }

      await post.remove();
      return true;
    }
  }
};

export default PostResolver;
