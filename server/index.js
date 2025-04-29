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
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
