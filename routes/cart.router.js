const express = require('express');
const cartRouter = express.Router();
const { Cart } = require('../models/cart.model')
const orderController = require("../controllers/orderController");

let { orders } = orderController;

cartRouter.route("/")
.get(async (req, res, next) => {
   try{
    const cart = await Cart.find({})
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

cartRouter.route("/:id")
.delete(async (req, res) => {
  try{
    const { id } = req.params;
    const deletedItem = await Cart.findByIdAndDelete(id)
    res.json({success:true, message: 'Item deleted'});
  } catch(err) {
    res.status(500).json({success: false, message: 'unable to delete product', errorMessage: err.message })
  }
})

cartRouter.route("/increase/:id")
.delete(async (req, res) => {
  try{
    const { _id } = req.params;
    const product = await Cart.findById(_id)
  } catch(err) {
    res.status(500).json({success: false, message: 'unable to update', errorMessage: err.message })
  }
})

module.exports = cartRouter;