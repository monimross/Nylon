const Razorpay = require("razorpay");
async function CreateRazorpayOrder(req, res) {
  const { amount } = req.body;
  let instance = new Razorpay({
    key_id: "rzp_test_TMPwvQpYGAIMbU",
    key_secret: "npv8RgJl8tOaVbEvUBm3oFzM",
  });
  const order = await instance.orders.create({
    amount: parseFloat(amount.toFixed(2)) * 100,
    currency: "INR",
    receipt: "receipt#1",
    notes: {
      key1: "value3",
      key2: "value2",
    },
  });

  res.json({ order: order });
}

export default CreateRazorpayOrder;
