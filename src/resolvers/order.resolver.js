const { UserInputError } = require("apollo-server-core");
const Order = require("./../models/order.model.js");

const orderResolver = {
  Query: {
    orders: async () => {
      return await Order.find().catch((err) => {
        throw new UserInputError(err.message);
      });
    },
    order: async (_, { id }) => {
      return await Order.findById(id).catch((err) => {
        throw new UserInputError(err);
      });
    },
  },
  Mutations: {
    createOrder: async (_, { client, products, status }) => {
      const newOrder = new Order({
        date: Date.now,
        client,
        products,
        status,
        mount,
      });

      return await newOrder.save().catch((err) => {
        throw new UserInputError(err.message);
      });
    },
    updateOrder: async (_, { id, status }) => {
      return await Order.findByIdAndUpdate(id, {
        mount,
        status
      });
    },
    deleteOrder: async () => {},
  },
  Order: {
    client: async () => {},
  },
};

module.exports = orderResolver;
