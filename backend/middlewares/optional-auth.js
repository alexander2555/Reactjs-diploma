const User = require('../models/User')
const { verify } = require('../helpers/token')

module.exports = async function optionalAuth(req, res, next) {
  const token = req.cookies?.token

  if (!token) {
    req.user = null
    return next()
  }

  try {
    const tokenData = verify(token)
    const user = await User.findOne({ _id: tokenData.id })

    req.user = user || null
  } catch (err) {
    req.user = null
  }

  next()
}
