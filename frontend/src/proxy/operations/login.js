/**
 * Автроризация пользователя
 *
 * @param {authLogin: string}
 * @param {authPassword: string}
 * @returns {error: string|null, res: object|null} - объект пользователя или null
 */

// интеграция: прежняя авторизация через локальный proxy/getUser
// import { getUser } from '../api'
// import { sessions } from '../sessions'
// export const login = async (authLogin, authPassword) => { ... }

import { apiRequest } from '../../utils/api'
import { sessions } from '../sessions'

export const login = async (authLogin, authPassword) => {
  try {
    const response = await apiRequest('login', {
      method: 'POST',
      body: { login: authLogin, password: authPassword },
    })

    // backend возвращает { user }, apiRequest вернёт user
    const user = response?.user ? response.user : response

    const hash = sessions.create({ login: user.login })

    return {
      err: null,
      res: {
        ...user,
        session: hash,
      },
    }
  } catch (err) {
    return {
      err: err.message || 'Login error',
      res: null,
    }
  }
}
