import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    default: false,
  },
  last_name: {
    type: String,
    default: false,
  },
  email: {
    type: String,
    allowNull: false,
  },
  password: {
    type: String,
    allowNull: false,
  },
  role: {
    type: String,
    required: true,
    default: "user",
  },
  token: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
