import mongoose from 'mongoose';

// Individual Order Item
const orderItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, default: '/product.png' },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  weight: { type: String, default: '' }
});

// Order containing items, amount, status, date
const orderSchema = new mongoose.Schema({
  items: [orderItemSchema],
  amount: { type: Number, required: true },
  status: { type: String, default: 'Placed' },
  date: { type: Date, default: Date.now }
});

// User model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    sparse: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 10,
    match: /^\d{10}$/,
  },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['user', 'vendor', 'admin'],
    default: 'user',
  },
  profileImage: { type: String, default: '/Profile_image.jpg' },

  address: {
    street: String,
    city: String,
    pincode: String,
    state: String,
  },

  orders: [orderSchema],

  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', userSchema);
