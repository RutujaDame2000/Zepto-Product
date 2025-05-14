import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// ✅ GET user profile
// @route   GET /api/profile
// @access  Private
router.get('/profile', authenticateToken, async (req, res) => {
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

// ✅ UPDATE user profile
// @route   PUT /api/profile/update
// @access  Private
router.put('/profile/update', authenticateToken, async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ success: false, message: 'Name is required' });
  }

  try {
    const user = req.user;
    user.name = name;
    await user.save();

    res.json({ success: true, message: 'Profile updated successfully' });
  } catch (error) {
    console.error('❌ Profile update error:', error);
    res.status(500).json({ success: false, message: 'Failed to update profile' });
  }
});

export default router;
