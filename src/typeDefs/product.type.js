const { gql } = require("apollo-server-core");

const productType = gql`
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

module.exports = productType;
