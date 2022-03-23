import { gql } from "apollo-server-core";
import gid from "graphql-iso-date";
import {
  typeDef as Category,
  resolvers as categoryResolvers,
} from "./category.js";
import {
  typeDef as Order,
  resolvers as orderResolvers
} from "./order.js";
import {
  typeDef as Product,
  resolvers as productResolvers,
} from "./product.js";
import {
  typeDef as Review,
  resolvers as reviewResolvers
} from "./review.js";
import {
  typeDef as User,
  resolvers as userResolvers
} from "./user.js";

const Root = gql`
  scalar Date

  type Query {
    _: String
  }

  type Mutation {
    _: String
  }

  type Token {
    value: String
  }
`;

const rootResolvers = {
  Date: gid.GraphQLDate,
};

export const typeDefs = [Root, Category, Order, Product, Review, User];
export const resolvers = [
  rootResolvers,
  categoryResolvers,
  orderResolvers,
  productResolvers,
  reviewResolvers,
  userResolvers,
];
