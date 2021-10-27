const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Cannot enter product without a name, please enter product name"
  },
  image: {
    type: String,
    required: "Cannot enter product without image, please enter product image"
  },
  price: {
    type: Number,
    required: "Cannot enter product without price, please enter product price"
  },
  quantity: {
    type: Number
  },
  description: {
    type: String
  },
},
{
  timestamps: true,
})

const Cart = mongoose.model('Cart', CartSchema);

module.exports = { Cart };