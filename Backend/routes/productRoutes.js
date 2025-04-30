// import express from 'express';
// import Product from '../models/Product.js';

// const router = express.Router();

// // Get products by category
// router.get('/category/:categoryName', async (req, res) => {
//   const { categoryName } = req.params;
//   try {
//     const products = await Product.find({ category: categoryName });
//     res.json({ products });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error fetching products" });
//   }
// });



// // GET /api/products?category=fruits-vegetables
// router.get('/', async (req, res) => {
//   const category = req.query.category;
//   try {
//     let query = {};
//     if (category) {
//       query.category = category;
//     }
//     const products = await Product.find(query);
//     res.json({ products });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// export default router;  // ✅ ONLY HERE, NOT IN server.js


import express from 'express';
import Product from '../models/Product.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

// ✅ Admin: Get all products, or filter by vendor ID
router.get('/admin', protect, authorizeRoles('admin'), async (req, res) => {
  try {
    const vendorId = req.query.vendorId;
    const query = vendorId ? { vendor: vendorId } : {};

    const products = await Product.find(query).populate('vendor', 'name email');
    res.json({ products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// 🔄 Category-based fetch for public or user
router.get('/category/:categoryName', async (req, res) => {
  const { categoryName } = req.params;
  try {
    const products = await Product.find({ category: categoryName });
    res.json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching products" });
  }
});

// 🌐 GET /api/products (optional: ?category=xyz)
router.get('/', async (req, res) => {
  const category = req.query.category;
  try {
    let query = {};
    if (category) {
      query.category = category;
    }
    const products = await Product.find(query);
    res.json({ products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
