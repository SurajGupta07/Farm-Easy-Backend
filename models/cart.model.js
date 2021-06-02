const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  quantity: {
    type: Number
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: "No id provided. Adding none to cart.",
    ref: 'Product',
  }
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = { Cart };