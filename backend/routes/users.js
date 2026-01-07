const express = require('express')

const { getUsers, getRoles } = require('../controllers/user')
const hasRole = require('../middlewares/hasRole')
const auth = require('../middlewares/auth')
const { mapUser } = require('../helpers/map')

const ROLES = require('../constants/roles')

const router = express.Router({ mergeParams: true })

router.get('/', auth, hasRole([ROLES.ADMIN, ROLES.MASTER]), async (req, res) => {
  const users = await getUsers()

  res.status(200).send(users.map(mapUser))
})

router.get('/roles', (req, res) => {
  const roles = getRoles()

  res.status(200).send(roles)
})

module.exports = router
