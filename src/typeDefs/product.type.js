import { gql } from "apollo-server-core";

export const productType = `
  type Product {
    id: ID
    name: String
    description: String!
    category: Category
    image: String!
    gallery: [String!]!
    price: Float
    rating: Float
    stock: Int
    brand: String!
    availability: Availability!
    reviews: [Review!]!
  }

  enum Availability {
    AVAILABLE
    DISCONTINUED
  }

  extend type Query {
    products: [Product!]!
    product(id: ID!): Product!
  }
`;
