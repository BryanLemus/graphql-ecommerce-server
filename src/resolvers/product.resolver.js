const { UserInputError } = require("apollo-server-core");
const Product = require("./../models/product.model.js");
const Category = require("./../models/category.model.js");
const Review = require("./../models/review.model.js");

const productResolvers = {
  Query: {
    products: async () => {
      try {
        return await Product.find();
      } catch (error) {
        throw new UserInputError(error);
      }
    },
    product: async (_, { id }) => {
      try {
        return await Product.findById(id);
      } catch (error) {
        throw new UserInputError(error, {
          invalidArgs: args,
        });
      }
    },
  },
  Mutation: {
    createProduct: async (_, { product }) => {
      try {
        let newProduct = new Product({
          name: product.name,
          description: product.description,
          brand: product.brand,
          categoryId: product.category,
          image: product.image,
          gallery: product.gallery,
          price: product.price,
        });

        await newProduct.save().then(() => {
          return "Product added sucessfully";
        });
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
    deleteProduct: async (_, { id }) => {
      try {
        return await Product.findByIdAndDelete(id);
      } catch (error) {
        throw new UserInputError(error);
      }
    },
    updateProduct: async (_, { id, product }) => {
      try {
        return await Product.findByIdAndUpdate(id, product);
      } catch (error) {
        throw new UserInputError(error);
      }
    },
  },
  Product: {
    category: async ({ categoryId }) => {
      try {
        return await Category.findById(categoryId);
      } catch (error) {
        throw new UserInputError(error);
      }
    },
    review: async ({ id }) => {
      return await Review.find({ productId: id });
    },
  },
};

module.exports = productResolvers;
