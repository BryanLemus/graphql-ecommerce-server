import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  avatar: String,
  username: { type: String, unique: true, minlength: 4 },
  email: { type: String, unique: true, minlength: 4 },
  password: { type: String },
  displayName: String,
  roles: {
    type: [String],
    enum: ["USER", "ADMIN", "AUX"],
    default: ["USER"],
  },
});

export default mongoose.model("User", userSchema);
