import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// POST /api/payment/create-checkout-session
router.post("/create-checkout-session", async (req, res) => {
  const { amount } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Tutoring Session Payment" },
            unit_amount: amount * 100, // amount in cents
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.CLIENT_URL}/payment-success.html`,
      cancel_url: `${process.env.CLIENT_URL}/payment-cancel.html`,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("❌ Stripe Error:", error.message);
    res.status(500).json({ message: "Payment failed", error: error.message });
  }
});

export default router;


