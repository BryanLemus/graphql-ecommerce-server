import { Schema, model } from "mongoose";

const productSchema = new Schema({
  name: String,
  description: String,
  brand: String,
  categoryId: {
    ref: "Category",
    type: Schema.Types.ObjectId,
  },
  image: String,
  gallery: [String],
  price: Number,
  rating: Number,
  stock: Number,
  availability: String,
});

export default model("Product", productSchema);
