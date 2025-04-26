const express = require('express');
const app = express();
const stripe = require('stripe')('YOUR_SECRET_STRIPE_KEY'); // replace with your real secret key

app.use(express.static('public'));
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Tutoring Session',
              description: '1-hour personalized tutoring session',
            },
            unit_amount: 5000, // price in cents (e.g., $50.00)
          },
          quantity: 1,
        },
      ],
      success_url: 'https://localhost:55555/success',
      cancel_url: 'https://localhost:55555/cancel',
    });

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));