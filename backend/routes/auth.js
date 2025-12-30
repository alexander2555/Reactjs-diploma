const express = require('express')
const { register, login, me } = require('../controllers/user')
const auth = require('../middlewares/auth')
const mapUser = require('../helpers/map-user')

const router = express.Router({ mergeParams: true })

const cookieOptions = { httpOnly: true, sameSite: 'lax' }

router.post('/register', async (req, res) => {
  try {
    const { user, token } = await register(req.body.login, req.body.password)

    res
      .cookie('token', token, cookieOptions)
      .status(201)
      .send({ error: null, user: mapUser(user) })
  } catch (err) {
    res.status(400).send({ error: err.message || 'Unknown error' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { user, token } = await login(req.body.login, req.body.password)

    res
      .cookie('token', token, cookieOptions)
      .send({ error: null, user: mapUser(user) })
  } catch (err) {
    res.status(401).send({ error: err.message || 'Unknown error' })
  }
})

router.get('/me', auth, async (req, res) => {
  try {
    const user = await me(req.user.id)
    res.send({ error: null, user: mapUser(user) })
  } catch (err) {
    res.status(401).send({ error: err.message || 'Unknown error' })
  }
})

router.post('/logout', async (req, res) => {
  res.cookie('token', '', { ...cookieOptions, maxAge: 0 }).send({ error: null })
})

module.exports = router
