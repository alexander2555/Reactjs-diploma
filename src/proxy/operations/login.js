/**
 * Автроризация пользователя
 *
 * @param {string} authLogin
 * @param {string} authPassword
 * @returns {error: string|null, res: object|null} - объект пользователя или null
 */
import { getUser } from '../api'
import { sessions } from '../sessions'

export const login = async (authLogin, authPassword) => {
  const user = await getUser(authLogin)

  if (!user) {
    return {
      error: 'User not found',
      res: null,
    }
  }

  const { password, id, login, role_id } = user

  if (password !== authPassword) {
    return {
      error: 'Invalid password',
      res: null,
    }
  }

  const hash = sessions.create({ login })

  return {
    error: null,
    res: {
      id,
      login,
      roleId: role_id,
      session: hash,
    },
  }
}
