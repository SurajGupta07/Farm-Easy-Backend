const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const mongoose = require('mongoose');

const productRoute = require('./routes/product.router.js')
const categoriesRoute = require('./routes/categories.router.js')
const paymentRoute = require('./routes/payment.router.js')
const cartRoute = require('./routes/cart.router.js')
const wishlistRouter = require('./routes/wishlist.router.js')
const authRouter = require('./routes/auth.router.js')
const { requireAuth } = require('./middlewares/auth-middleware.js')
const { routeNotFound } = require('./middlewares/route-not-found.middleware')
const { errorHandler } = require("./middlewares/error-handler.middleware")
const { initializeDBConnection } = require("./db/db.connect.js")

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = 3000;

initializeDBConnection();

app.use('/products',  productRoute)
app.use('/categories', categoriesRoute)
app.use('/payment', paymentRoute)
app.use('/cart', requireAuth, cartRoute)
app.use('/wishlist', requireAuth, wishlistRouter)
app.use(authRouter);

app.get('/', (req, res) => {
  res.send({success:true, message: "FARM-EASY"})
});

/**
 * 404 route handler
 *NOTE: DO not move. This should be the last route. Location dependent. 
 */
app.use(routeNotFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log('server started on', PORT);
});