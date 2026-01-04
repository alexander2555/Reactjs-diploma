const User = require('../models/User')

const bcrypt = require('bcrypt')
const { generate } = require('../helpers/token')

const ROLES = require('../constants/roles')

const register = async (login, pass, role) => {
  if (!login || !pass) {
    throw new Error('[REGISTER] Login and password are required!')
  }

  const exists = await User.findOne({ login })
  if (exists) {
    throw new Error('[REGISTER] User already exists!')
  }

  const passHash = await bcrypt.hash(pass, 10)

  const user = await User.create({ login, password: passHash, role_id: role })
  const token = generate({ id: user.id })

  return { user, token }
}

const login = async (login, pass) => {
  if (!login || !pass) {
    throw new Error('[LOGIN] Login and password are required!')
  }

  const user = await User.findOne({ login })

  if (!user) {
    throw new Error('[LOGIN] User not found!')
  }

  const isPassMatch = await bcrypt.compare(pass, user.password)

  if (!isPassMatch) {
    throw new Error('[LOGIN] Wrong passsword!')
  }

  const token = generate({ id: user.id })

  return { user, token }
}

const getUsers = () => {
  return User.find()
}

const getRoles = () => {
  return [
    { id: ROLES.ADMIN, name: 'Админ' },
    { id: ROLES.MASTER, name: 'Мастер' },
    { id: ROLES.EDITOR, name: 'Редактор' },
    { id: ROLES.GUEST, name: '' },
  ]
}

// const deleteUser = async (id) => {
//   return User.deleteOne({ _id: id })
// }

// const updateUser = async (id, userData) => {
//   return User.findByIdAndUpdate(id, userData, { returnDocument: 'after' })
// }

module.exports = { register, login, getUsers, getRoles }
