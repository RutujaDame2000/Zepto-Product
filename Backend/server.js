import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import uploadRoutes from "./routes/uploadRoutes.js";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from './routes/userRoutes.js';
import checkoutRoutes from "./routes/checkoutRoutes.js";
import orderRoutes from './routes/orderRoutes.js'



dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', uploadRoutes); 

// Static uploads folder
app.use('/uploads', express.static(path.join(path.resolve(), '/backend/public/uploads')));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve images from backend/public/uploads
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', profileRoutes);
app.use('/api/products', productRoutes); 
app.use('/api/users', userRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orderRoute", orderRoutes);


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
