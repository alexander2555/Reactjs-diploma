import { getUser } from './get-user'
import { addUser } from './add-user'
import { sessions } from './sessions'

export const server = {
  /**
   * Автроризация пользователя
   *
   * @param {string} authLogin
   * @param {string} authPassword
   * @returns {error: string|null, res: object|null} - объект сессии или null
   */
  async authorize(authLogin, authPassword) {
    const user = await getUser(authLogin)

    if (!user) {
      return {
        error: 'User not found',
        res: null,
      }
    }

    if (user.password !== authPassword) {
      return {
        error: 'Invalid password',
        res: null,
      }
    }

    return {
      error: null,
      res: {
        id: user.id,
        login: user.login,
        role_id: user.role_id,
        session: sessions.create(user),
      },
    }
  },
  /**
   * Регистрация пользователя
   *
   * @param {string} regLogin
   * @param {string} regPassword
   * @returns {error: string|null, res: object|null} - объект сессии или null
   */
  async register(regLogin, regPassword) {
    const user = await getUser(regLogin)

    if (user) {
      return {
        error: 'User already exists',
        res: null,
      }
    }

    await addUser(regLogin, regPassword)

    return {
      error: null,
      res: {
        id: user.id,
        login: user.login,
        role_id: user.role_id,
        session: sessions.create(user),
      },
    }
  },
  /**
   * Выход из системы
   *
   * @param {string} hash - Хеш сессии
   */
  signout(hash) {
    sessions.remove(hash)
  },
}
