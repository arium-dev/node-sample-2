import mongoose from "mongoose";
const itemSchema = new mongoose.Schema({
  productIds: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    },
  ],
  subTotal: {
    type: Number,
  },

});
const Item = mongoose.model("Item", itemSchema);
export default Item;
