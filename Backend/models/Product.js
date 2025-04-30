// server/models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  image: String,
  price: String,
  weight: String,
  discount: Number,
  deliveryTime: String,
});



const Product = mongoose.model("Product", productSchema);
export default Product;
