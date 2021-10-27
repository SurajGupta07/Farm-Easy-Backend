const express = require('express');
const router = express.Router();
const { Product } = require("../models/product.model")
const { extend } = require("lodash")

var password = 'letsgo';

function checkAuthentication(req, res, next){
  if(password == 'letsgo'){
    const user = { name: 'suraj', userId: 'suraj-12q' }
    req.user = user
    next();
  }else {
    res.status(401).json({success: false, message: 'chaabi leke aana'})
  }
}
    
router.use('/:id', checkAuthentication)

router.route("/")
.get(async (req, res) => {
  try{
    const products = await Product.find({})
    res.json({success: true, products})
  } catch ( err ){
    res.status(500).json({success: false, message: "Unable to get products", errorMessage: err.message})
  }
})
.post(async (req,res) => {
  try{
    const product = req.body;
    const NewProduct = new Product(product);
    const savedProduct = await NewProduct.save();
    res.json({ success: true, product: savedProduct })
  } catch(err) {
    res.status(500).json({success: false, message: 'unable to add products', errorMessage: err.message })
  }
})

router.param("productId", async (req, res, next, productId) => {
  try{
    const productWithId = await Product.findById(productId);
    if(!productWithId){
      return res.status(400).json({success:false, message: "Product not found"})
    }
    req.productWithId = productWithId;
    next();
  } catch {
    res.status(400).json({success:false, message: "Product not found error"})
  }
})

router.route("/:productId")
.get(async (req, res) => {
  let { productWithId } = req;
  productWithId._v = undefined;
  res.json({success: true, productWithId})
})
.post(async (req, res) => {
  const productsUpdates = req.body;
  let { productWithId } = req;
  productWithId = extend(productWithId, productsUpdates)
  productWithId = await productWithId.save()
  res.json({success: true, productWithId }) 
})

module.exports = router;