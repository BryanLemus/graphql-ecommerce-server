import { gql } from "apollo-server-core";

export const userType = gql`
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

  extend type Query {
    users: [User!]!
    user(id: ID!): User!
  }

  extend type Mutation {
    createUser(
      username: String
      email: String
      password: String
      displayName: String
    ): User
    updateUser(
      id: ID
      username: String
      email: String
      password: String
      displayName: String
    ): User!
    deleteUser(id: ID): User!
    login(username: String, password: String): Token!
  }
`;
