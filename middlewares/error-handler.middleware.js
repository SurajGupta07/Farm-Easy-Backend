function errorHandler(req, res, next) {
  console.error(err.stack)
  res.status(500).json({success: false, errorMessage: err.message})
}

module.exports = { errorHandler }