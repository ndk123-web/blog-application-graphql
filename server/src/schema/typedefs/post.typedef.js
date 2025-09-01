const Post = `#graphql

    type Post{
        _id: ID!
        title: String!
        subtitle: String!
        text: String!
        createdAt: String!
        updatedAt: String!
        image: String
        author: User!   
    }

    type Query{
        getAllPosts: [Post!]!
        getPostById(postId: ID!): Post! 
    }

    extend type Mutation{
        createPost(title: String!, subtitle: String!, text: String!): Post!
        editPost(postId:ID! , title: String! , subtitle: String! , text: String!): Post!
        deletePost(postId: ID!): Boolean!
    }

`

export default Post;