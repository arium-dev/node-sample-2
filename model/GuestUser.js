import mongoose from "mongoose";

const guestUserSchema = new mongoose.Schema({
  name: {
    type: String,
    default: false,
  },

  email: {
    type: String,
    allowNull: false,
  },
  contact_info: {
    type: String,
    allowNull: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const GuestUser = mongoose.model("GuestUser", guestUserSchema);

export default GuestUser;
