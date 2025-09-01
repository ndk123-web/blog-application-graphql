    const User = `#graphql

                type User{
                    _id: ID!
                    name: String!
                    email: String!
                    createdAt: String!
                    updatedAt: String!
                }

                type AuthPayload{
                    token: String!
                    user: User!
                }

                extend type Mutation{
                    login(email: String! , password: String! ): AuthPayload!
                    signUp(name: String! , email: String! , password: String! , confirmPassword: String! ): AuthPayload!
                    logOut(email: String!): Boolean!
                }
                
    `

    export default User;