import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  brand: String,
  categoryId: {
    ref: "Category",
    type: mongoose.Schema.Types.ObjectId,
  },
  image: String,
  gallery: [String],
  price: Number,
  rating: { type: Number, default: 0 },
  stock: { type: Number, default: 0 },
  availability: { type: String, default: "UNAVAILABLE" },
});

export default new mongoose.model("Product", productSchema);
