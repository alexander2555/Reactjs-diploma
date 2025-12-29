/**
 * Запрос списка ролей пользователя
 *
 * @param {id?: number}
 * @returns {error: string|null, res: object|string|null} - объект с массивом ролей, ролью или null
 */

import { getRoles } from '../api'

export const fetchRoles = async id => {
  const roles = await getRoles(id)

  if (!(roles && roles.length)) {
    return {
      err: '[PROXY] Roles not found',
      res: null,
    }
  }

  return {
    err: null,
    res: id || id === 0 ? roles[0] : roles,
  }
}
