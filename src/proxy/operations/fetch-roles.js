/**
 * Запрос списка ролей пользователя
 *
 * @returns {error: string|null, res: object|null} - объект с массивом ролей или null
 */

import { getRoles } from '../api'

export const fetchRoles = async () => {
  const roles = await getRoles()

  if (!(roles && roles.length)) {
    return {
      error: 'Roles not found',
      res: null,
    }
  }

  return {
    error: null,
    res: { data: roles },
  }
}
