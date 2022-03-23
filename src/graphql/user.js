import { gql } from "apollo-server-core";
import { AuthenticationError, UserInputError } from "apollo-server-core";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Auth from "../services/auth.service.js";
import User from "../models/user.model.js";

export const typeDef = gql`
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

export const resolvers = {
  Query: {
    users: async () => {
      try {
        return await find();
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
    user: async (_, { id }) => {
      try {
        return await findById(id);
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
  },
  Mutation: {
    singup: async (_, { username, email, password, displayName }) => {
      try {
        if (!(await find({ username: username }))) {
          const newUser = new User({
            username,
            email,
            password: await Auth.hashPassword(password),
            displayName,
          });
          return await newUser.save();
        }
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
    login: async (_, { username, email, password }) => {
      if (!username || !email)
        return new Error("Email or username is required");

      const userPayload = email ? { email } : { username };
      const user = await findOne(userPayload);

      if (!bcrypt.compare(password, user.password))
        throw new AuthenticationError("User or password are wrong");

      return {
        value: jwt.sign(
          {
            userId: user.id,
            username: user.username,
            email: user.email,
            roles: user.roles,
          },
          process.env.TOKEN_SECRET,
          { expiresIn: "30 days" }
        ),
      };
    },
    updateUser: async (_, { id, username, email, password, displayName }) => {
      try {
        const user = await findById(id);

        if (!user) return;

        return await findByIdAndUpdate(id, {
          username,
          email,
          displayName,
          password: await Auth.hashPassword(password),
        });
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
    deleteUser: async (_, { id }) => {
      try {
        const user = await findById(id);

        if (!user) return;

        return await findByIdAndDelete(id);
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
  },
};
