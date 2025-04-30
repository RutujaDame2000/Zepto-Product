
import express from 'express';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Get user profile
// @route   GET /api/profile
// @access  Private (need JWT)
router.get('/profile', protect, async (req, res) => {
  if (req.user) {
    res.json({
      _id: req.user._id,
      name: req.user.name,
      phone: req.user.phone,
      cashBalance: req.user.cashBalance || 0,
      orders: req.user.orders || [],
    });
  } else {
    res.status(404).json({ success: false, message: 'User not found' });
  }
});

// Add this in your profileRoutes.js

router.put('/profile/update', protect, async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ success: false, message: 'Name is required' });
  }

  try {
    const user = await req.user;
    user.name = name;
    await user.save();

    res.json({ success: true, message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ success: false, message: 'Failed to update profile' });
  }
});


export default router;
