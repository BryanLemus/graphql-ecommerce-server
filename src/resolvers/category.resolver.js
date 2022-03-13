const { UserInputError } = require("apollo-server-core");
const Category = require("../models/category.model.js");
const Product = require("../models/product.model.js");

const categoryResolver = {
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

module.exports = categoryResolver;