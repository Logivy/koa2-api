const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
  user_name: {
    type: String,
    unique: true,
  },
  password: String,
  is_admin: {
    type: Boolean,
    default: false
  }
})

module.exports = model('User', UserSchema)