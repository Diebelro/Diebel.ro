import express from "express";
import Stripe from "stripe";
import cors from "cors";

const app = express();
const stripe = new Stripe("STRIPE_SECRET_KEY"); // cheia secretă din Stripe Dashboard

app.use(cors());
app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
  const { quantity } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: "price_1234567890", // ID-ul prețului creat în Stripe Dashboard
          quantity: quantity,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
