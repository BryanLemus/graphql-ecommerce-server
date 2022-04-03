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
    /**
     * Return all categories
     * @returns [Categories]
     */
    categories: async () => {
      try {
        return await Category.find();
      } catch (error) {
        throw new UserInputError(error);
      }
    },

    /**
     * category
     * Find a category by Id
     * @param {*} parent
     * @param {*} args
     * @returns Category
     */
    category: async (_, { id }) => {
      try {
        return Category.findById(id);
      } catch (error) {
        throw new UserInputError(error);
      }
    },
  },
  Mutation: {
    /**
     * createCategory
     * Create a category
     * @param {*} parent
     * @param {*} args 
     * @returns Category
     */
    createCategory: async (_, { name }) => {
      const newCategory = new Category({ name });
      return await newCategory.save();
    },

    /**
     * deleteCategory
     * Delete a Category
     * @param {*} parent
     * @param { id: ID } args
     * @returns Category
     */
    deleteCategory: async (_, { id }) => {
      try {
        return await Category.findByIdAndDelete(id);
      } catch (error) {
        throw new UserInputError(error);
      }
    },

    /**
     * updateCategory
     * Update a Category
     * @param {*} parent
     * @param {*} args
     * @returns Category
     */
    updateCategory: async (_, { id, name }) => {
      try {
        return await Category.findByIdAndUpdate(id, { name });
      } catch (error) {
        throw new UserInputError(error);
      }
    },
  },
  Category: {
    /**
     * products
     * Return category's product
     * @param { id: ID } parent
     * @param {*} args
     * @param {*} context
     * @returns [Product]
     */
    products: async ({ id }, args, context) => {
      try {
        return await Product.find({ categoryId: id });
      } catch (error) {
        throw new UserInputError(error);
      }
    },
  },
};
