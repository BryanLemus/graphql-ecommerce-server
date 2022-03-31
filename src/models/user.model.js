import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  userName: { type: String, unique: true, minlength: 4 },
  displayName: { type: String },
  email: { type: String, unique: true, minlength: 4 },
  phone: { type: String },
  password: { type: String },
  roles: {
    type: [String],
    enum: ["ADMIN", "EDITOR", "CUSTOMER"],
    default: ["CUSTOMER"],
  },
});

export default mongoose.model("User", userSchema);
