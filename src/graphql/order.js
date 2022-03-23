import { UserInputError, gql } from "apollo-server-core";
import Order from "./../models/order.model.js";
import User from "./../models/user.model.js";
import Product from "./../models/product.model.js";

export const typeDef = gql`
  type Order {
    id: ID
    date: Date!
    client: User!
    products: [OrderProduct!]!
    mount: Float
    status: String
  }

  type OrderProduct {
    productId: ID!
    quantity: Int!
    price: Float!
  }

  input OrderProductInput {
    productId: ID!
    quantity: Int!
    price: Float!
  }

  extend type Query {
    orders: [Order!]
    order(id: ID!): Order
  }

  extend type Mutation {
    createOrder(
      clientId: ID!
      products: [OrderProductInput!]!
      status: String!
    ): Order
    deleteOrder(id: ID!): Order
  }
`;

export const resolvers = {
  /**
   * QUERIES
   */

  Query: {
    /**
     * Return all orders
     * @returns Order
     */
    orders: async () => {
      return await Order.find().catch((err) => {
        throw new UserInputError(err.message);
      });
    },

    /**
     * Find an order by id and it return
     * @param {*} parent
     * @param {id: ID!} args
     * @param {*} context
     * @returns Order
     */
    order: async (parent, { id }, context) => {
      return await Order.findById(id).catch((err) => {
        throw new UserInputError(err);
      });
    },
  },

  Order: {
    /**
     * Returns order's client
     * @param {clientId: ID} parent
     * @returns User
     */
    client: async ({ clientId }) => {
      return await User.findById(clientId).catch((err) => {
        throw new UserInputError(err.message);
      });
    },
  },

  /**
   * MUTATIONS
   */

  Mutation: {
    /**
     * Create an order
     * @param {*} parent
     * @param {clientId: ID!, products: [OrderProductInput!]!, status: String!} args
     * @param {*} context
     * @returns Order
     */
    createOrder: async (parent, { clientId, products, status }, context) => {
      let mount = 0;

      products.forEach(async (product) => {
        /** Calculate the mount value */
        mount += product.quantity * product.price;

        /** Calculate and update the product stock */
        const stock =
          (await Product.findById(product.id)).stock - product.quantity;
        await Product.findByIdAndUpdate(id, { stock });
      });

      /** Creating the new order */
      const newOrder = new Order({
        date: Date.now,
        clientId,
        products,
        status,
        mount,
      });

      /** Saving the new order on database */
      return await newOrder.save().catch((err) => {
        throw new UserInputError(err.message);
      });
    },

    /**
     * Find an delete an order
     * @param {*} parent
     * @param {id: ID} args
     * @param {*} context
     * @returns Order
     */
    deleteOrder: async (parent, { id }, context) => {
      return await Order.findByIdAndDelete(id).catch((err) => {
        throw new UserInputError(err.message);
      });
    },
  },
};
