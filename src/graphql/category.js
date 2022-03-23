import { UserInputError, gql } from "apollo-server-core";
import Category from "../models/category.model.js";
import Product from "../models/product.model.js";

export const typeDef = gql`
  type Category {
    id: ID!
    name: String
    products: [Product!]!
  }

  extend type Query {
    categories: [Category!]!
    category(id: ID!): Category!
  }

  extend type Mutation {
    createCategory(name: String!): Category!
    deleteCategory(id: ID!): Category!
    updateCategory(name: String!): Category!
  }
`;

export const resolvers = {
  Query: {
    categories: async () => {
      try {
        return await Category.find();
      } catch (error) {
        throw new UserInputError(error);
      }
    },
    category: async (_, { id }) => {
      try {
        return Category.findById(id);
      } catch (error) {
        throw new UserInputError(error);
      }
    },
  },
  Mutation: {
    createCategory: async (_, { name }) => {
      const newCategory = new Category({ name });
      return await newCategory.save();
    },
    deleteCategory: async (_, { id }) => {
      try {
        return await Category.findByIdAndDelete(id);
      } catch (error) {
        throw new UserInputError(error);
      }
    },
    updateCategory: async (_, { id, name }) => {
      try {
        return await Category.findByIdAndUpdate(id, { name });
      } catch (error) {
        throw new UserInputError(error);
      }
    },
  },
  Category: {
    products: async (parent, args, context) => {
      try {
        return await Product.find({ categoryId: parent.id });
      } catch (error) {
        throw new UserInputError(error);
      }
    },
  },
};
