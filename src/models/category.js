import { Schema, model } from "mongoose";

const categorySchema = new Schema({
  name: String,
});

export default model("Category", categorySchema);
