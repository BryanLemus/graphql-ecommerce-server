const { UserInputError } = require("apollo-server-core");
const Review = require("./../models/review.model.js");
const User = require("./../models/user.model.js");
const Product = require("./../models/product.model.js");

const reviewResolver = {
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
  Resolver: {
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

module.exports = reviewResolver;