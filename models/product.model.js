const mongoose = require("mongoose");

//Create DB entry with Mongoose
const ProductSchema = new mongoose.Schema({
  name: String,
  image: String,
  price: Number,
  quantity: Number,
  availability: String
})

const Product = mongoose.model('Product', ProductSchema)

module.exports = { Product }