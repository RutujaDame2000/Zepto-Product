import express from 'express';
import User from '../models/User.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// ✅ Save order after payment (from /order-success)
router.post('/save', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { items, amount } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Order items are required' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Prevent duplicate save within 60 seconds and same amount
    const isDuplicate = user.orders.some(order =>
      Math.abs(new Date() - new Date(order.date)) < 60000 &&
      order.amount === amount
    );
    if (isDuplicate) {
      return res.status(409).json({ error: "Duplicate order detected" });
    }

    const formattedItems = items.map(item => ({
      name: item.name,
      image: item.image || '/product.png',
      price: item.price,
      quantity: item.quantity,
      weight: item.weight || '',
    }));

    const newOrder = {
      status: 'Placed',
      amount,
      items: formattedItems,
      date: new Date(),
    };

    user.orders.push(newOrder);
    await user.save();

    res.json({ success: true, message: 'Order saved', order: newOrder });
  } catch (err) {
    console.error('❌ Error saving order:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ✅ Get current logged-in user's order history
router.get('/history/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user.orders || []);
  } catch (err) {
    console.error('❌ Failed to fetch order history:', err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// ✅ Optional: Get order history by user ID (admin use)
router.get('/history/:userId', authenticateToken, async (req, res) => {
  const userId = req.params.userId === 'me' ? req.user.id : req.params.userId;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user.orders || []);
  } catch (err) {
    console.error('❌ Failed to fetch order history by ID:', err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

export default router;
