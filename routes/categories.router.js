const express = require('express')
const categories = express.Router();

const category = [
  { id: 212, name: 'Organic' },
  { id: 312, name: 'Farm' }
]

categories.route("/")
.get((req, res) => {
  res.json({ category })
})

module.exports = categories;