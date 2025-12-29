/**
 * Запрос списка пользователей
 *
 * @param {id?: number}
 * @returns {error: string|null, res: object|string|null} - объект с массивом пользователей, пользователем или null
 */

import { getUsers } from '../api'

export const fetchUsers = async id => {
  const users = await getUsers(id)

  if (!(users && users.length)) {
    return {
      err: '[PROXY] Users not found',
      res: null,
    }
  }

  return {
    err: null,
    res: id || id === 0 ? users[0] : users,
  }
}
