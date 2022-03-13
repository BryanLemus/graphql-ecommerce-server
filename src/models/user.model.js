const { Schema, model } = require("mongoose");

const userSchema = new Schema({
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

module.exports = model("User", userSchema);
