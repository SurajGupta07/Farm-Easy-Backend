const mongoose = require("mongoose");

//Create DB entry with Mongoose
const ProductSchema = new mongoose.Schema({
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
    type: String,
    required: "Cannot enter product without availability, please enter product availability"
  },
  fastDelivery: {
    type: Boolean,
    required: "Cannot enter product without fastDelivery, please enter product fastDelivery"
  },
  description: {
    type: String
  },
  offers: {
    type: Number
  },
  rating: {
    type: Number
  }
},
{
  timestamps: true,
})

const Product = mongoose.model('Product', ProductSchema)

module.exports = { Product }