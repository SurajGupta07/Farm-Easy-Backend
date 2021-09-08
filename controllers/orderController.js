const Razorpay = require('razorpay');
const shortid = require('shortid');
const { Cart } = require('../models/cart.model')

const razorpay = new Razorpay({
    key_id: 'rzp_test_2NYb6PnL0SIkc4',
    key_secret: 'YussmRi8llQa2iQ4wpKjCJHH'
});

const orders = async (req, res) => {
    const { totalAmount } = req.body;
    const payment_capture = 1;
    const amount = totalAmount;
    const currency = 'INR';

    const options = {
        amount: amount * 100,
        currency,
        receipt: shortid.generate(),
        payment_capture
    };

    try {
        const response = await razorpay.orders.create(options);
        res.json({
            success: true,
            id: response.id,
            currency: response.currency,
            amount: response.amount,
        });
    } catch (error) {
        console.log(error);
        res.json({
            message: 'error occured',
            error: error
        });
    }
};

const cartItems = async (req, res) => {
  try{
    const cart = await Cart.remove();
    res.json({success: true, cart})
  } catch(err) {
    res.json({success: false, err})
  }
}

module.exports = {
    orders,
    cartItems
};
