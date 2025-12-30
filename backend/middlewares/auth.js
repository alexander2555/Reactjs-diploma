const User = require('../models/User')
const { verify } = require('../helpers/token')

module.exports = async function (req, res, next) {
  try {
    const tokenData = verify(req.cookies.token)

    const user = await User.findOne({ _id: tokenData.id })

    if (!user) {
      res.status(401).send({ error: '[AUTH] User not found!' })
      return
    }

    req.user = user

    next()
  } catch (err) {
    res.status(401).send({ error: '[AUTH] Invalid or missing token' })
  }
}
