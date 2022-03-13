const { gql } = require("apollo-server-core");

const orderType = gql`
  type Order {
    id: ID
    date: Date!
    client: User!
    mount: Float!
    products: [OrderProduct]
    status: String
  }

  extend type Query {
    orders: [Order!]
    order(id: ID): Order
  }

  type OrderProduct {
    product: Product
    quantity: Int
    price: Float
  }

  input OrderProductInput {
    productId: ID
    quantity: Int
    price: Float
  }

  extend type Mutation {
    createOrder(
      client: ID
      products: [OrderProductInput]
      status: String
      mount: Float
    ): Order!
    updateOrder(id: ID, products: [OrderProductInput!], status: String): User!
    deleteOrder(id: ID): User!
  }
`;

module.exports = orderType;
