import { Schema, model } from "mongoose";

const reviewSchema = new Schema({
  title: String,
  body: String,
  date: Date,
  rating: Number,
  userId: {
    ref: "User",
    type: Schema.Types.ObjectId,
  },
});

export default model("Review", reviewSchema);
