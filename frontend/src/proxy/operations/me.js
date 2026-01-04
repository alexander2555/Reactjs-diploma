/**
 * Проверка текущей сессии пользователя
 *
 * @returns {error: string|null, res: object|null} - объект пользователя или null
 */
import { getUser } from '../api'
import { sessions } from '../sessions'

export const me = async () => {
  const currentLogin = sessions.currentLogin()
  if (!currentLogin) return { err: null, res: null }
  const user = await getUser(currentLogin)
  if (!user) {
    sessionStorage.removeItem('sessionData')
    return { err: null, res: null }
  }

  const { id, login, roleId } = user

  const session =
    Object.keys(JSON.parse(sessionStorage.getItem('sessionData') || '{}'))[0] ||
    sessions.create({ login })

  return {
    err: null,
    res: {
      id,
      login,
      roleId,
      session,
    },
  }
}
