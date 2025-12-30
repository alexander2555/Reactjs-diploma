const User = require('../models/User')
const bcrypt = require('bcrypt')
const { generate } = require('../helpers/token')
const ROLES = require('../constants/roles')

// Регистрация
async function register(login, pass) {
  if (!login || !pass) {
    throw new Error('[REGISTER] Login and password are required!')
  }

  const exists = await User.findOne({ login })
  if (exists) {
    throw new Error('[REGISTER] User already exists!')
  }

  const passHash = await bcrypt.hash(pass, 10)

  const user = await User.create({ login, pass: passHash })
  const token = generate({ id: user.id })

  return { user, token }
}

// Авторизация
async function login(login, pass) {
  if (!login || !pass) {
    throw new Error('[LOGIN] Login and password are required!')
  }

  const user = await User.findOne({ login })

  if (!user) {
    throw new Error('[LOGIN] User not found!')
  }

  const isPassMatch = await bcrypt.compare(pass, user.pass)

  if (!isPassMatch) {
    throw new Error('[LOGIN] Wrong passsword!')
  }

  const token = generate({ id: user.id })

  return { user, token }
}

// Текущий пользователь по токену
async function me(userId) {
  const user = await User.findById(userId)

  if (!user) {
    throw new Error('[ME] User not found!')
  }

  return user
}

// Получение пользователей
function getUsers() {
  return User.find()
}

// Получение ролей
function getRoles() {
  return [
    { id: ROLES.ADMIN, name: 'Админ' },
    { id: ROLES.MASTER, name: 'Мастер' },
    { id: ROLES.EDITOR, name: 'Редактор' },
    { id: ROLES.GUEST, name: '' },
  ]
}

// Удаление пользователя
// function deleteUser(id) {
//   return User.deleteOne({ _id: id })
// }

// Редактирование пользователя
// function updateUser(id, userData) {
//   return User.findByIdAndUpdate(id, userData, { returnDocument: 'after' })
// }

module.exports = { register, login, me, getUsers, getRoles }
