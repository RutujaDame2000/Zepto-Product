import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    minLength: [10, 'Phone number must be 10 digits long'],
    maxLength: [10, 'Phone number must be 10 digits long'],
    match: [/^\d{10}$/, 'Phone number must contain only digits']
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'vendor', 'admin'],
    default: 'user'
  },
  cashBalance: {
    type: Number,
    default: 0
  },
  orders: [{
    status: { type: String, required: true },
    date: { type: Date, default: Date.now, required: true },
    amount: { type: Number, required: true },
    items: [{ type: String, required: true }]
  }]
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
