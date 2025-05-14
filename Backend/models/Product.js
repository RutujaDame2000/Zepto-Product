import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
  },
  subcategory: { type: String },
  image: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    required: true,
  },
  weight: {
    type: String,
    default: "",
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
  discount: {
    type: Number,
    default: 0,
  },
  deliveryTime: {
    type: String,
    default: "10 min",
  },
  description: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    enum: ['Pending', 'Active', 'Sold Out'],
    default: 'Pending'
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
export default Product;
