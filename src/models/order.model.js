import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  clientId: {
    ref: "User",
    type: mongoose.Schema.Types.ObjectId,
  },
  products: {
    productId: {
      ref: "Product",
      type: mongoose.Schema.Types.ObjectId,
    },
    quantity: Number,
    price: String,
  },
  mount: Number,
  payMode: String,
  status: String,
});

export default mongoose.model("Order", orderSchema);
