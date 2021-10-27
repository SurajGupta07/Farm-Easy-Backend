const mongoose = require('mongoose');
const { Schema } = mongoose;

const WishlistSchema = new Schema({
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
  availability: {
    type: String
  }
}, 
{
  timestamps: true,
});

const Wishlist = mongoose.model('Wishlist', WishlistSchema);

module.exports = { Wishlist };