const { gql } = require("apollo-server-core");

const categoryType = gql`
  type Category {
    id: ID!
    name: String
    products: [Product!]!
  }

  extend type Query {
    categories: [Category!]!
    category(id: ID!): Category!
  }

  extend type Mutation {
    createCategory(name: String): Category!
  }
`;

module.exports = categoryType;
