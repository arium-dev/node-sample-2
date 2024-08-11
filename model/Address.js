import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  first_name: {
    type: String,
    default: false,
  },
  last_name: {
    type: String,
    default: false,
  },
  phone: {
    type: String,
    allowNull: false,
  },
  email: {
    type: String,
    allowNull: false,
  },
  country: {
    type: String,
    allowNull: false,
  },
  address: {
    type: String,
    allowNull: false,
  },
  city: {
    type: String,
    allowNull: false,
  },
  country: {
    type: String,
    allowNull: false,
  },
  postal_code: {
    type: String,
    allowNull: false,
  },
});

const Address = mongoose.model("Address", addressSchema);

export default Address;
