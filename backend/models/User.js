const mongoose = require('mongoose')
const roles = require('../constants/roles')

const UserSchema = mongoose.Schema(
  {
    login: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role_id: {
      type: Number,
      default: roles.GUEST,
    },
  },
  { timestamps: true },
)

const User = mongoose.model('User', UserSchema)

module.exports = User
