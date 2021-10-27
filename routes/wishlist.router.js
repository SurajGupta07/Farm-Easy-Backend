const express = require('express');
const wishlistRouter = express.Router();
const { Wishlist } = require("../models/wishlist.model")

wishlistRouter.route("/")
.get(async (req, res, next) => {
   try{
    const wishlist = await Wishlist.find({})
    res.json({success: true, wishlist})
  } catch ( err ){
    res.status(500).json({success: false, message: "Unable to get products", errorMessage: err.message})
  }
})
.post(async (req, res, next) => {
  try{
    const wishlistItem = req.body;
    const NewWishlistItem = new Wishlist(wishlistItem.product);
    const savedWishlistItem = await NewWishlistItem.save();
    res.json({ success: true, wishlistItem: savedWishlistItem })
  } catch(err) {
    res.status(500).json({success: false, message: 'unable to add products', errorMessage: err.message })
  }
})

wishlistRouter.route("/:id")
.delete(async (req, res) => {
  try{
    const { id } = req.params;
    const deletedWishlistItem = await Wishlist.findByIdAndDelete(id)
    res.json({success:true, message: 'Item deleted'});
  } catch(err) {
    res.status(500).json({success: false, message: 'unable to delete product', errorMessage: err.message })
  }
})

module.exports = wishlistRouter;