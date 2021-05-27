const express = require('express');
const cartRouter = express.Router();
const { Cart } = require('../models/cart.model')

cartRouter.route("/")
.get(async (req, res) => {
   try{
    const cart = await Cart.find({})
    console.log(" your cart items", cart)
    res.json({success: true, cart})
  } catch ( err ){
    res.status(500).json({success: false, message: "Unable to get products", errorMessage: err.message})
  }
})
.post(async (req, res, next) => {
  try{
    const cartItem = req.body;
    const NewCartItem = new Cart(cartItem.product);
    const savedCartItem = await NewCartItem.save();
    res.json({ success: true, cartItem: savedCartItem })
  } catch(err) {
    res.status(500).json({success: false, message: 'unable to add products', errorMessage: err.message })
  }
})

module.exports = cartRouter;