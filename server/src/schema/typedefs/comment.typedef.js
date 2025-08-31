const Comment = `#graphql
type Comment {
  id: ID!
  text: String!
  user: User!
  post: Post!
  createdAt: String!
  updatedAt: String!
}

type Query {
  getCommentById(commentId: ID!): Comment!
  getCommentsByPost(postId: ID!): [Comment!]!
}

type Mutation {
  createComment(text: String!, postId: ID!): Comment!
  deleteComment(commentId: ID!): Boolean!
  editComment(commentId: ID!, text: String!): Comment!
}
`;

export default Comment;
