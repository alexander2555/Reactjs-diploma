/**
 * Проверка текущей сессии пользователя
 *
 * @returns {error: string|null, res: object|null} - объект пользователя или null
 */
import { getUser } from '../api'
import { sessions } from '../sessions'

export const me = async () => {
  // интеграция: прежняя проверка сессии через локальный список пользователей
  // const currentLogin = sessions.currentLogin()
  // if (!currentLogin) return { err: null, res: null }
  // const user = await getUser(currentLogin)

  try {
    const meResp = await getUserFromApi()

    if (!meResp) {
      sessionStorage.removeItem('sessionData')
      return { err: null, res: null }
    }

    const { id, login, roleId, role_id } = meResp

    const session =
      Object.keys(JSON.parse(sessionStorage.getItem('sessionData') || '{}'))[0] ||
      sessions.create({ login })

    return {
      err: null,
      res: {
        id,
        login,
        roleId: roleId ?? role_id,
        session,
      },
    }
  } catch (err) {
    return {
      err: err.message || '[PROXY] Me failed',
      res: null,
    }
  }
}

import { apiRequest } from '../../utils/api'

async function getUserFromApi() {
  try {
    const response = await apiRequest('me')
    // backend возвращает { user }, apiRequest вернёт user
    return response?.user ? response.user : response
  } catch (err) {
    console.error('[API] Me (integration)', err)
    return null
  }
}
