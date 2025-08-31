import Comment from "../../models/comment.model.js";

const CommentResolver = {
    Query: {
        getCommentById: async (_, { commentId }) => {
            const comment = await Comment.findById(commentId).populate("user").populate("post");
            if (!comment) throw new Error("Comment Not Found");
            return comment;
        },

        getCommentsByPost: async (_, { postId }) => {
            const comments = await Comment.find({ post: postId }).populate("user").populate("post");
            return comments;
        },
    },

    Mutation: {
        createComment: async (_, { text, postId }, context) => {
            const user = context?.user;
            if (!user) throw new Error("User Not Authorized");

            const newComment = await Comment.create({
                text,
                user: user._id,
                post: postId
            });

            return await newComment.populate("user").populate("post");
        },

        editComment: async (_, { commentId, text }, context) => {
            const user = context?.user;
            if (!user) throw new Error("User Not Authorized");

            const comment = await Comment.findById(commentId);
            if (!comment) throw new Error("Comment Not Found");

            if (comment.user.toString() !== user._id.toString()) {
                throw new Error("Not Authorized to edit this comment");
            }

            comment.text = text;
            return await comment.save();
        },

        deleteComment: async (_, { commentId }, context) => {
            const user = context?.user;
            if (!user) throw new Error("User Not Authorized");

            const comment = await Comment.findById(commentId);
            if (!comment) throw new Error("Comment Not Found");

            if (comment.user.toString() !== user._id.toString()) {
                throw new Error("Not Authorized to delete this comment");
            }

            await comment.remove();
            return true;
        }
    }
};

export default CommentResolver;
