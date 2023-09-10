const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

async function CreateStripeSession(req, res) {
  let { amount, order_id } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: parseFloat(amount.toFixed(2)) * 100,
    currency: "usd",
    payment_method_types: ["card"],
    metadata: {
      order_id: order_id,
    },
  });

  res.json({ paymentIntent: paymentIntent });
}

export default CreateStripeSession;
