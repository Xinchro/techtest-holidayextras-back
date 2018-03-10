const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
  email: String,
  forename: String,
  surname: String,
  created: String
})

let userModel
try {
  userModel = mongoose.model('user', userSchema)
} catch(e) {
  userModel = mongoose.model('user')
}

module.exports = userModel
module.exports.schema = userSchema
