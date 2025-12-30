const express = require('express')
const { getUsers, getRoles } = require('../controllers/user')
const hasRole = require('../middlewares/hasRole')
const auth = require('../middlewares/auth')
const mapUser = require('../helpers/map-user')

const ROLES = require('../constants/roles')

const router = express.Router({ mergeParams: true })

router.get('/', auth, hasRole([ROLES.ADMIN]), async (req, res) => {
  const users = await getUsers()

  res.send({ data: users.map(mapUser) })
})

router.get('/roles', (req, res) => {
  const roles = getRoles()

  res.send({ data: roles })
})

module.exports = router
