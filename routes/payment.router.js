const { Router } = require('express');
const orderController = require("../controllers/orderController");

const router = Router();
let { orders, cartItems } = orderController;

router.post('/new', orders);
router.post('/delete', cartItems)

module.exports = router;