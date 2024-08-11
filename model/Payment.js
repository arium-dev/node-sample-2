import mongoose from "mongoose";
const paymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    allowNull: false,
  },
  currency: {
    type: String,
    allowNull: false,
  },
  customerId: {
    type: String,
    allowNull: false,
  },

  uid: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
