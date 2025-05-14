// import express from 'express';
// import Product from '../models/Product.js';
// import { protect } from '../middleware/authMiddleware.js';
// import { authorizeRoles } from '../middleware/roleMiddleware.js';

// const router = express.Router();

// // ✅ Get products by category name
// router.get('/category/:categoryName', async (req, res) => {
//   const { categoryName } = req.params;
//   try {
//     const products = await Product.find({ category: categoryName });
//     res.json({ products });
//   } catch (error) {
//     console.error('Error fetching products by category:', error);
//     res.status(500).json({ message: "Error fetching products" });
//   }
// });

// // ✅ Admin: Get all products or filter by vendor ID
// router.get('/admin', protect, authorizeRoles('admin'), async (req, res) => {
//   try {
//     const vendorId = req.query.vendorId;
//     const filter = vendorId ? { vendor: vendorId } : {};
//     const products = await Product.find(filter);
//     res.json({ products });
//   } catch (err) {
//     console.error('Error fetching admin products:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // ✅ General product listing by query string (e.g. ?category=flowers)
// router.get('/', async (req, res) => {
//   try {
//     const { category } = req.query;
//     const filter = category ? { category } : {};
//     const products = await Product.find(filter);
//     res.json({ products });
//   } catch (err) {
//     console.error('Error fetching products:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // ✅ Single product route — must be last
// router.get('/:productId', async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.productId);
//     if (!product) return res.status(404).json({ message: 'Product not found' });
//     res.json(product);
//   } catch (error) {
//     console.error('Error fetching product by ID:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });


// // ✅ Add new product (Vendor)
// router.post('/vendor/add', protect, authorizeRoles('vendor'), async (req, res) => {
//   try {
//     const newProduct = new Product({
//       ...req.body,
//       vendor: req.user._id,
//     });
//     const saved = await newProduct.save();
//     res.status(201).json({ success: true, product: saved });
//   } catch (error) {
//     console.error('Add product error:', error);
//     res.status(500).json({ success: false, message: 'Failed to add product' });
//   }
// });

// // ✅ Get products by vendor (correct endpoint)
// router.get('/vendor/products', protect, authorizeRoles('vendor'), async (req, res) => {
//   try {
//     const products = await Product.find({ vendor: req.user._id });
//     res.json({ success: true, products });
//   } catch (error) {
//     console.error('Vendor product fetch error:', error);
//     res.status(500).json({ success: false, message: 'Failed to fetch products' });
//   }
// });

// // ✅ Get product by ID
// router.get('/:id', protect, async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
//     res.json({ success: true, product });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Failed to get product' });
//   }
// });

// // ✅ Update product by vendor
// router.put('/:id', protect, authorizeRoles('vendor'), async (req, res) => {
//   try {
//     const product = await Product.findOne({ _id: req.params.id, vendor: req.user._id });
//     if (!product) return res.status(404).json({ success: false, message: 'Product not found or unauthorized' });

//     Object.assign(product, req.body);
//     await product.save();

//     res.json({ success: true, product });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Failed to update product' });
//   }
// });

// // ✅ Delete product by vendor
// router.delete('/:id', protect, authorizeRoles('vendor'), async (req, res) => {
//   try {
//     const product = await Product.findOneAndDelete({ _id: req.params.id, vendor: req.user._id });
//     if (!product) return res.status(404).json({ success: false, message: 'Not found or unauthorized' });

//     res.json({ success: true, message: 'Product deleted' });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Failed to delete product' });
//   }
// });


// // ✅ Public: Get all products for search/homepage
// router.get('/', async (req, res) => {
//   try {
//     const products = await Product.find(); // You can also use .limit(20) for performance
//     res.json({ products });
//   } catch (error) {
//     console.error('❌ Error fetching all products:', error);
//     res.status(500).json({ message: 'Failed to fetch products' });
//   }
// });

// // In productRoutes.js
// router.get('/:id', protect, async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       return res.status(404).json({ success: false, message: 'Product not found' });
//     }
//     // Optional: check if the user is the vendor
//     if (req.user.role === 'vendor' && product.vendor.toString() !== req.user._id.toString()) {
//       return res.status(403).json({ success: false, message: 'Unauthorized access' });
//     }

//     res.json({ success: true, product });
//   } catch (error) {
//     console.error('GET /:id error:', error);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// });



// export default router;


// routes/products.js


import express from 'express';
import Product from '../models/Product.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

// ✅ Get products by category name (Public)
// ✅ Enhanced: Get products by category name and optional subcategory
router.get('/category/:categoryName', async (req, res) => {
  try {
    const { subcategory } = req.query;
    const filter = { category: req.params.categoryName };

    // If subcategory filter is passed
    if (subcategory) {
      filter.subcategory = subcategory;
    }

    const products = await Product.find(filter);
    res.json({ products });
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ message: "Error fetching products" });
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
    const filter = req.query.category ? { category: req.query.category } : {};
    const products = await Product.find(filter);
    res.json({ products });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Add product (Vendor only)
router.post('/vendor/add', authenticateToken, authorizeRoles('vendor'), async (req, res) => {
  try {
    const { name, category, price, stock, status, image, weight, discount, deliveryTime, description } = req.body;

    const finalStatus = stock === 0 ? "Sold Out" : status || "Pending";

    const newProduct = new Product({
      name,
      category,
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
    res.status(500).json({ success: false, message: 'Failed to add product' });
  }
});

// ✅ Get products by logged-in vendor
router.get('/vendor/products', authenticateToken, authorizeRoles('vendor'), async (req, res) => {
  try {
    const products = await Product.find({ vendor: req.user._id });
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch products' });
  }
});

// ✅ Get product by ID (Public)
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ✅ Update product (Vendor or Admin)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    // Restrict to vendor’s own products
    if (req.user.role === 'vendor' && product.vendor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Unauthorized update' });
    }

    Object.assign(product, req.body);

    // Auto-set status if stock is zero
    if (product.stock === 0) product.status = 'Sold Out';

    const updated = await product.save();
    res.json({ success: true, product: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update product' });
  }
});

// ✅ Delete product (Vendor only)
router.delete('/:id', authenticateToken, authorizeRoles('vendor'), async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ _id: req.params.id, vendor: req.user._id });
    if (!product) return res.status(404).json({ success: false, message: 'Not found or unauthorized' });

    res.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete product' });
  }
});

export default router;
