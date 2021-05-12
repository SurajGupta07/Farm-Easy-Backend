const mongoose = require('mongoose');
const dbConnection = process.env['DATABASE_URI']

function initializeDBConnection(){
  mongoose.connect(dbConnection, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})
.then(() => console.log("Successfully connected!"))
.catch(error => console.error("mongoose connection failed", error))

}

module.exports = { initializeDBConnection }