import express from 'express';
import User from '../models/User.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

// ✅ Admin: Add a new vendor
router.post('/add-vendor', authenticateToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;

    if (!name || !phone || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'Vendor already exists' });
    }

    const newVendor = new User({
      name,
      phone,
      email,
      password, // 🔒 Consider hashing if not already handled in a pre-save hook
      role: 'vendor',
    });

    await newVendor.save();
    res.status(201).json({ success: true, message: 'Vendor created successfully' });
  } catch (error) {
    console.error('❌ Error creating vendor:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// ✅ Admin: Get all vendors
router.get('/vendors', authenticateToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const vendors = await User.find({ role: 'vendor' });
    res.json({ success: true, vendors });
  } catch (error) {
    console.error('❌ Error fetching vendors:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch vendors' });
  }
});

// ✅ Admin: Delete vendor
router.delete('/delete-vendor/:id', authenticateToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const deletedVendor = await User.findByIdAndDelete(req.params.id);
    if (!deletedVendor) {
      return res.status(404).json({ success: false, message: 'Vendor not found' });
    }
    res.json({ success: true, message: 'Vendor deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting vendor:', error);
    res.status(500).json({ success: false, message: 'Failed to delete vendor' });
  }
});

export default router;
