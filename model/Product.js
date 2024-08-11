import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category',required:true }, 
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  sale: {
    type: Boolean,
    default: false,
  },
  discountedPrice: {
    type: Number,
    validate: {
      validator: function(value) {
        // Check if discount price is provided only when sale is true
        return !this.sale || (this.sale && value !== undefined);
      },
      message: "Discount price is required when the product is on sale",
    },
  },
  rating: {
    type: Number,
    required: true,
  },
  images: [{ type: String }], 

  quantity: {
    type: Number,
    // required: true,
    default:1,
  },
  stock: {
    type: Number,
    required: true,
  },
 
  size: [{
    type: String
  }],
  tags: [{
    type: String,
    enum: ['New Arrival', 'Featured', 'Sale', 'Limited Edition']
  }],

  sku: {
    type: String,
    required: true,
  },
  short_description: {
    type: String,
   
  },
  long_description: {
    type: String,

  },
  colorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Color', required:true }, 
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
