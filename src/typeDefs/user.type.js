const { gql } = require("apollo-server-core");

const userType = gql`
  type User {
    id: ID
    username: String
    email: String
    displayName: String
    password: String
    roles: [Role!]!
  }

  enum Role {
    USER
    ADMIN
    AUX
  }

  input userInput {
    username: String
    email: String
    password: String
    displayName: String
  }

  extend type Query {
    users: [User!]!
    user(id: ID!): User!
  }

  extend type Mutation {
    singup(user: userInput): User
    login(username: String, password: String): Token!
    deleteUser(id: ID): User!
    updateUser(id: ID, user: userInput): User!
  }
`;

module.exports = userType;
