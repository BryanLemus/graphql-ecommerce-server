const { GraphQLDate } = require("graphql-iso-date");
const { productResolvers } = require("./product.resolver.js");
const { userResolvers } = require("./user.resolver.js");
const { categoryResolver } = require("./category.resolver.js");
const { reviewResolver } = require("./review.resolver.js");

const baseResolver = {
  Date: GraphQLDate,
};

const resolvers = [
  userResolvers,
  productResolvers,
  categoryResolver,
  reviewResolver,
  baseResolver,
];

module.exports = resolvers;
