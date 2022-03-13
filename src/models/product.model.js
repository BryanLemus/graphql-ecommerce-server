const { Schema, model } = require("mongoose");

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
  rating: { type: Number, default: 0 },
  stock: { type: Number, default: 0 },
  availability: { type: String, default: "UNAVAILABLE" },
});

module.exports = model("Product", productSchema);
