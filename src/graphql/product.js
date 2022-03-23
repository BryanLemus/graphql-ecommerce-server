import { gql, UserInputError } from "apollo-server-core";
import Product from "./../models/product.model.js";
import Category from "./../models/category.model.js";
import Review from "./../models/review.model.js";

export const typeDef = gql`
  type Product {
    id: ID
    name: String
    description: String!
    brand: String!
    category: Category
    image: String!
    gallery: [String!]!
    price: Float
    rating: Float
    stock: Int
    availability: Availability!
    reviews: [Review!]!
  }

  enum Availability {
    AVAILABLE
    UNAVAILABLE
  }

  extend type Query {
    products: [Product!]!
    product(id: ID!): Product!
  }

  input productInput {
    name: String!
    description: String!
    brand: String!
    category: ID!
    image: String!
    gallery: [String!]!
    price: Float!
  }

  extend type Mutation {
    createProduct(product: productInput): Product!
    deleteProduct(id: ID): Product!
    updateProduct(id: ID, product: productInput): Product!
  }
`;

export const resolvers = {
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
    reviews: async ({ id }) => {
      return await Review.find({ productId: id });
    },
  },
};
