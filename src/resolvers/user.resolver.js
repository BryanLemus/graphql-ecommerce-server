const { AuthenticationError, UserInputError } = require("apollo-server-core");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Auth } = require("../services/auth.service.js");
const User = require("../models/user.model.js");

const userResolvers = {
  Query: {
    users: async () => {
      try {
        return await User.find();
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
    user: async (_, { id }) => {
      try {
        return await User.findById(id);
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
        if (!(await User.find({ username: username }))) {
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
      const user = await User.findOne(userPayload);

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

module.exports = userResolvers;
