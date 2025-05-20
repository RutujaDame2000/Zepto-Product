import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// POST /api/checkout/create-checkout-session
router.post("/create-checkout-session", async (req, res) => {
  try {
    const { items } = req.body;

    console.log("🛒 Received items from frontend:", items);

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "No items provided" });
    }

    const line_items = items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
          images: item.image ? [`https://yourdomain.com${item.image}`] : [],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    console.log("📦 Stripe line_items:", line_items);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/order-success?success=true`,
      cancel_url: `${process.env.FRONTEND_URL}/order-success?success=false`,
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("❌ Stripe session creation failed:", err.message);
    return res.status(500).json({ error: err.message });
  }
});

export default router;
