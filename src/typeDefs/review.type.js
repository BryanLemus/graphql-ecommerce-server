const { gql } = require("apollo-server-core");

const reviewType = gql`
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

module.exports = reviewType;
