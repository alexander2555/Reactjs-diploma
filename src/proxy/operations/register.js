/**
 * Регистрация пользователя
 *
 * @param {string} regLogin
 * @param {string} regPassword
 * @returns {error: string|null, res: object|null} - объект пользователя или null
 */
import { addUser, getUser } from '../api'
import { sessions } from '../sessions'

export const register = async (regLogin, regPassword, regRole) => {
  const user = await getUser(regLogin)

  if (user) {
    return {
      err: 'User already exists',
      res: null,
    }
  }

  const { id, login, role_id } = await addUser(regLogin, regPassword, regRole)

  const hash = sessions.create({ login })

  return {
    err: null,
    res: {
      id,
      login,
      roleId: role_id,
      hash,
    },
  }
}
