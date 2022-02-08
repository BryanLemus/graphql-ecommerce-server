import { UserInputError } from "apollo-server-core";
import { Auth } from "../services/auth.service.js";

import User from "../models/user.js";

export const userResolvers = {
  Query: {
    users: async () => {
      try {
        return await User.find();
      } catch (error) {
        throw new UserInputError(error);
      }
    },
    user: async (_, { id }) => {
      try {
        return await User.findById(id);
      } catch (error) {
        throw new UserInputError(error, {
          invalidArgs: args,
        });
      }
    },
  },
  Mutation: {
    createUser: async (_, { username, email, password, displayName }) => {
      try {
        if (await User.find({ username: username })) {
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
    updateUser: async (_, { id, username, email, password, displayName }) => {
      try {
        const user = await User.findById(id);

        if (!user) return;

        return await User.findByIdAndUpdate(id, {
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
        const user = await User.findById(id);

        if (!user) return;

        return await User.findByIdAndDelete(id);
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
  },
};
