const User = require('../models/User')
const bcrypt = require('bcrypt')
const { generate } = require('../helpers/token')
const ROLES = require('../constants/roles')

// Регистрация
async function register(login, pass) {
  if (!pass) {
    throw new Error('[REGISTER] Password is required!')
  }

  const passHash = await bcrypt.hash(pass, 10)

  const user = await User.create({ login, pass: passHash })
  const token = generate({ id: user.id })

  return { user, token }
}

// Авторизация
async function login(login, pass) {
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

module.exports = { register, login, getUsers, getRoles }
