const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const mongoose = require('mongoose');

const { Product } = require("./models/product.model.js")
const productRoute = require('./routes/product.router.js')
const categoriesRoute = require('./routes/categories.router.js')
const { routeNotFound } = require('./middlewares/route-not-found.middleware')
const { errorHandler } = require("./middlewares/error-handler.middleware")
const { initializeDBConnection } = require("./db/db.connect.js")

const app = express();
app.use(bodyParser.json());
app.use(cors())

const PORT = 3000;

initializeDBConnection();

Product.find({})
.then(data => console.log(data))

var myLogger = function(req, res, next){
  if(req.params){
    console.log(req.params)
    console.log('TIME', Date.now())
    next();
  }
}

app.use('/products',  productRoute)
app.use('/categories', categoriesRoute)

app.use(myLogger)

app.get('/', (req, res) => {
  res.send('Hello World!')
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