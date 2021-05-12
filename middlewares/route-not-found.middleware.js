function routeNotFound(req, res, next){
  res.status(404).json({ success: false, message: "URL not found, please check" })
}

module.exports = { routeNotFound }