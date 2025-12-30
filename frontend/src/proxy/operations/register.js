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
  // интеграция: предыдущая регистрация через локальные данные
  // const user = await getUser(regLogin)
  // if (user) { ... }
  // const { id, login, role_id } = await addUser(...)

  const created = await addUser(regLogin, regPassword, regRole)

  if (!created) {
    return {
      err: '[PROXY] User did not register',
      res: null,
    }
  }

  const { id, login, roleId, role_id } = created

  const hash = sessions.create({ login })

  return {
    err: null,
    res: {
      id,
      login,
      roleId: roleId ?? role_id,
      hash,
    },
  }
}
