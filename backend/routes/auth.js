const express = require('express')

const User = require('../models/User')
const { register, login } = require('../controllers/user')

const { mapUser } = require('../helpers/map')
const { verify } = require('../helpers/token')

const router = express.Router({ mergeParams: true })

const cookieOptions = { httpOnly: true, sameSite: 'lax' }

router.post('/register', async (req, res) => {
  try {
    const { user, token } = await register(
      req.body.login,
      req.body.password,
      req.body.role,
    )

    res.cookie('token', token, cookieOptions).status(201).send(mapUser(user))
  } catch (err) {
    res.status(400).send({ error: err.message || 'Unknown error' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { user, token } = await login(req.body.login, req.body.password)

    res.cookie('token', token, cookieOptions).status(200).send(mapUser(user))
  } catch (err) {
    res.status(401).send({ error: err.message || 'Unknown error' })
  }
})

router.get('/me', async (req, res) => {
  try {
    const token = req.cookies.token

    if (!token) {
      throw new Error('[ME] New user login required')
    }
    const { id } = verify(token)

    const user = await User.findById(id).lean()

    res.status(200).send(mapUser(user))
  } catch (err) {
    res.status(401).send({ error: err.message || 'Unknown error' })
  }
})

router.post('/logout', async (req, res) => {
  res
    .cookie('token', '', { ...cookieOptions, maxAge: 0 })
    .status(204)
    .send()
})

module.exports = router
