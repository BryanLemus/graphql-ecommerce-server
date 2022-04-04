import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: String,
});

export default new mongoose.model("Category", categorySchema);
