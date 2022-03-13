const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    userId: {
      ref: "User",
      type: Schema.Types.ObjectId,
      required: true,
    },
    productId: {
      ref: "Review",
      type: Schema.Types.ObjectId,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    date: Date,
  },
  {
    timestamps: Date.now,
  }
);

module.exports = model("Review", reviewSchema);
