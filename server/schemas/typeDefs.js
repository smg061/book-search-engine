const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    _id: ID
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
  }

  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]
  }

  type Query {
    books: [Book]
    users: [User]
  }

`;
// type Mutation {
//   addThought(thoughtText: String!, thoughtAuthor: String!): Thought
//   addComment(thoughtId: ID!, commentText: String!): Thought
//   removeThought(thoughtId: ID!): Thought
//   removeComment(thoughtId: ID!, commentId: ID!): Thought
// }
module.exports = typeDefs;
