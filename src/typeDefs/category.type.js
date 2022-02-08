import { gql } from "apollo-server-core";

export const categoryType = gql`
  type Category {
    id: ID!
    name: String
    products: [Product!]!
  }

  extend type Query {
    categories: [Category!]!
    category(id: ID!): Category!
  }
`;
