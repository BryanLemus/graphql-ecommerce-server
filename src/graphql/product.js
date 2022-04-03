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
    features: [Feature!]!
  }

  type Feature {
    property: String
    value: String
  }

  enum Availability {
    AVAILABLE
    UNAVAILABLE
  }

  input FeatureInput {
    property: String
    value: String
  }

  input productInput {
    name: String!
    description: String!
    brand: String!
    category: ID!
    image: String!
    gallery: [String!]!
    price: Float!
    features: [FeatureInput!]!
  }

  extend type Query {
    products: [Product!]!
    product(id: ID!): Product!
  }

  extend type Mutation {
    createProduct(product: productInput): Product!
    deleteProduct(id: ID): Product!
    updateProduct(id: ID, product: productInput): Product!
  }
`;

export const resolvers = {
  Query: {
    /**
     * products
     * Return all products
     * @returns [Products]
     */
    products: async () => {
      try {
        return await Product.find();
      } catch (error) {
        throw new UserInputError(error);
      }
    },

    /**
     * product
     * Find a product by id and return it.
     * @param {*} parent
     * @param { id: ID } args
     * @param {*} context
     * @returns Product
     */
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
    /**
     * createProduct
     * Creates a product
     * @param {*} parent
     * @param { product: ProductInput } args
     */
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
          features: product.features
        });

        await newProduct.save().then(() => {
          return "Product added sucessfully";
        });
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },

    /**
     * deleteProduct
     * Find and delete a product.
     * @param {*} parent
     * @param { id: ID } args
     * @returns Product
     */
    deleteProduct: async (_, { id }) => {
      try {
        return await Product.findByIdAndDelete(id);
      } catch (error) {
        throw new UserInputError(error);
      }
    },

    /**
     * updateProduct
     * Find and Update a product
     * @param {*} parent
     * @param { id: ID, product: ProductInput } args
     * @returns Product
     */
    updateProduct: async (_, { id, product }) => {
      try {
        return await Product.findByIdAndUpdate(id, product);
      } catch (error) {
        throw new UserInputError(error);
      }
    },
  },
  Product: {
    /**
     * category
     * Return the product's category
     * @param { categoryId: ID } parent
     * @returns Category
     */
    category: async ({ categoryId }) => {
      try {
        return await Category.findById(categoryId);
      } catch (error) {
        throw new UserInputError(error);
      }
    },

    /**
     * reviews
     * Return all product's reviews.
     * @param { id: ID } parent
     * @returns [Review]
     */
    reviews: async ({ id }) => {
      return await Review.find({ productId: id });
    },
  },
};
