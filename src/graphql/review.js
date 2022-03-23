import { UserInputError, gql } from "apollo-server-core";
import Review from "../models/review.model.js";
import User from "../models/user.model.js";
import Product from "../models/product.model.js";

export const typeDef = gql`
  type Review {
    id: ID!
    title: String!
    body: String!
    author: User!
    product: Product!
    rating: Float!
    date: Date!
  }

  input reviewInput {
    title: String
    body: String
    author: ID
    product: ID
    rating: Float
    date: Date
  }

  extend type Mutation {
    createReview(review: reviewInput!): Review!
    updateReview(id: ID!, review: reviewInput!): Review!
    deleteReview(id: ID!): Review!
  }
`;

export const resolvers = {
  Mutation: {
    createReview: async (_, { review }) => {
      try {
        const newReview = new Review({
          title: review.title,
          body: review.body,
          authorId: review.author,
          productId: review.product,
          date: review.date,
        });

        return await newReview.save();
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
    updateReview: async (_, { id, review }) => {
      try {
        return await Review.findByIdAndUpdate(id, {
          title: review.title,
          body: review.body,
          rating: review.rating,
          date: review.date,
        });
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
    deleteReview: async (_, { id }) => {
      try {
        return await Review.findByIdAndDelete(id);
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
  },
  Review: {
    author: async ({ authorId }) => {
      return await User.findById(authorId).catch((err) => {
        throw new UserInputError(err.message);
      });
    },
    product: async ({ productId }) => {
      await Product.findById(productId).catch((err) => {
        throw new UserInputError(err.message);
      });
    },
  },
};
