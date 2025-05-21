// ✅ productRoutes.js
import express from 'express';
import mongoose from 'mongoose';
import Product from '../models/Product.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

// ✅ Get products by category name (case-insensitive)
router.get('/category/:categoryName', async (req, res) => {
  try {
    const { subcategory } = req.query;
    const normalizedCategory = req.params.categoryName.replace(/-/g, " ").toLowerCase();

    const filter = {
      $expr: {
        $eq: [{ $toLower: "$category" }, normalizedCategory]
      }
    };

    if (subcategory) {
      filter.subcategory = new RegExp(`^${subcategory}$`, 'i');
    }

    const products = await Product.find(filter);
    res.json({ products });
  } catch (error) {
    console.error('❌ Error fetching products by category:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// ✅ Admin: Get all products or filter by vendor ID
router.get('/admin', authenticateToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const filter = req.query.vendorId ? { vendor: req.query.vendorId } : {};
    const products = await Product.find(filter);
    res.json({ products });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ General product listing
router.get('/', async (req, res) => {
  try {
    const filter = req.query.category
      ? { category: new RegExp(`^${req.query.category}$`, 'i') }
      : {};
    const products = await Product.find(filter);
    res.json({ products });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Add product (Vendor only)
router.post('/vendor/add', authenticateToken, authorizeRoles('vendor'), async (req, res) => {
  try {
    const {
      name,
      category,
      subcategory,
      price,
      stock,
      status,
      image,
      weight,
      discount,
      deliveryTime,
      description,
    } = req.body;

    const finalStatus = stock === 0 ? 'Sold Out' : status || 'Pending';

    const newProduct = new Product({
      name,
      category,
      subcategory,
      price,
      stock,
      image,
      weight,
      discount,
      deliveryTime,
      description,
      vendor: req.user._id,
      status: finalStatus,
    });

    const saved = await newProduct.save();
    res.status(201).json({ success: true, product: saved });
  } catch (error) {
    console.error('❌ Error adding product:', error);
    res.status(500).json({ success: false, message: 'Failed to add product' });
  }
});

// ✅ Get products by logged-in vendor
router.get('/vendor/products', authenticateToken, authorizeRoles('vendor'), async (req, res) => {
  try {
    const products = await Product.find({ vendor: req.user._id });
    res.json({ success: true, products });
  } catch (error) {
    console.error('❌ Error fetching vendor products:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch products' });
  }
});

// ✅ Get product by ID (Public with validation)
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  // 🔒 Validate MongoDB ObjectId format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: 'Invalid product ID' });
  }

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, product });
  } catch (error) {
    console.error('❌ Error fetching product by ID:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ✅ Update product (Vendor or Admin)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    if (
      req.user.role === 'vendor' &&
      product.vendor.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ success: false, message: 'Unauthorized update' });
    }

    Object.assign(product, req.body);

    if (product.stock === 0) product.status = 'Sold Out';

    const updated = await product.save();
    res.json({ success: true, product: updated });
  } catch (error) {
    console.error('❌ Failed to update product:', error);
    res.status(500).json({ success: false, message: 'Failed to update product' });
  }
});

// ✅ Delete product (Vendor only)
router.delete('/:id', authenticateToken, authorizeRoles('vendor'), async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      vendor: req.user._id,
    });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Not found or unauthorized' });
    }

    res.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    console.error('❌ Failed to delete product:', error);
    res.status(500).json({ success: false, message: 'Failed to delete product' });
  }
});

// ✅ Admin Add Product
router.post('/admin/add', authenticateToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const newProduct = new Product({ ...req.body });
    const saved = await newProduct.save();
    res.status(201).json({ success: true, product: saved });
  } catch (error) {
    console.error('❌ Admin failed to add product:', error);
    res.status(500).json({ success: false, message: 'Admin failed to add product' });
  }
});

export default router;
