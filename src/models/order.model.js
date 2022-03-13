const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
  clientId: {
    ref: "User",
    type: Schema.Types.ObjectId,
  },
  date: {
    type: Date,
    default: date.now,
  },
  mount: Number,
  status: String,
  products: [
    {
      productId: { ref: "Product", type: Schema.Types.ObjectId },
      quantity: Number,
    },
  ],
});

module.exports = model("Order", orderSchema);
