require("dotenv").config(); // ✅ load .env variables
const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // ✅ secret key from .env

app.use(cors());
app.use(express.json()); // ✅ parse JSON bodies

// Routes
app.post("/create-checkout-session", async (req, res) => {
  const { items } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "Invalid items array" });
  }

  try {
    const lineItems = items.map(item => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: item.title,
            images: [
              (item.imageUrl && item.imageUrl.startsWith("https://")) 
                ? item.imageUrl 
                : "https://via.placeholder.com/150"
            ],
          },
          unit_amount: parseInt(Number(item.price) * 100),
        },
        quantity: 1,
      }));
      
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:5173/cancel",
    });

    res.json({ id: session.id, payment: "success" });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/checkout-session", async (req, res) => {
  const { sessionId } = req.query;

  if (!sessionId) {
    return res.status(400).json({ error: "Missing sessionId" });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    res.json({
      id: session.id,
      payment_status: session.payment_status,
      customer_email: session.customer_details?.email || null,
      amount_total: session.amount_total,
      currency: session.currency,
    });
  } catch (err) {
    console.error("Session retrieve error:", err.message);
    res.status(400).json({ error: "Invalid session ID" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
