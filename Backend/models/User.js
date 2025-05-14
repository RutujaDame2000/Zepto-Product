// // import mongoose from 'mongoose';
// // const { Schema } = mongoose;

// // const userSchema = new Schema({
// //   name: {
// //     type: String,
// //     required: true
// //   },
// //   email: {
// //     type: String,
// //     required: true,
// //     unique: true,
// //     match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
// //     trim: true
// //   },
// //   phone: {
// //     type: String,
// //     required: true,
// //     minLength: [10, 'Phone number must be 10 digits long'],
// //     maxLength: [10, 'Phone number must be 10 digits long'],
// //     match: [/^\d{10}$/, 'Phone number must contain only digits']
// //   },
// //   password: {
// //     type: String,
// //     required: true
// //   },
// //   role: {
// //     type: String,
// //     enum: ['user', 'vendor', 'admin'],
// //     default: 'user'
// //   },
// //   cashBalance: {
// //     type: Number,
// //     default: 0
// //   },
// //  orders: [
// //   {
// //     items: [
// //       {
// //         productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
// //         quantity: Number,
// //       }
// //     ],
// //     amount: Number,
// //     status: { type: String, default: 'Placed' },
// //     date: { type: Date, default: Date.now }
// //   }
// // ],

// // }, { timestamps: true });

// // const User = mongoose.models.User || mongoose.model('User', userSchema);
// // export default User;


import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, default: '/product.png' },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  weight: { type: String, default: '' }
});

const orderSchema = new mongoose.Schema({
  items: [orderItemSchema],
  amount: { type: Number, required: true },
  status: { type: String, default: 'Placed' },
  date: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true, sparse: true },
  phone: { type: String, required: true },
  password: { type: String },
  profileImage: { type: String, default: '/Profile_image.jpg' },
  role: { type: String, enum: ['user', 'vendor', 'admin'], default: 'user' },
  address: {
    street: String,
    city: String,
    pincode: String,
    state: String
  },
  orders: [orderSchema],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);
