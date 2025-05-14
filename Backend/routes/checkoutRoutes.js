import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
console.log("Using Stripe Key:", process.env.STRIPE_SECRET_KEY); 

router.post("/create-checkout-session", async (req, res) => {
  const { items } = req.body;

  const line_items = items.map(item => ({
    price_data: {
      currency: "inr",
      product_data: { name: item.name },
      unit_amount: item.price * 100,
    },
    quantity: item.quantity,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
  payment_method_types: ["card"],
  line_items,
  mode: "payment",
  success_url: "http://localhost:3000/order-success?success=true",
  cancel_url: "http://localhost:3000/order-success?success=false",
});


    res.json({ url: session.url });

    
      console.log("Creating Stripe session for:", line_items);

  } catch (err) {
    console.error("Stripe error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
