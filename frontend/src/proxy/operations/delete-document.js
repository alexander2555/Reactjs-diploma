/**
 * Удаление документа
 *
 * @param {id: number}
 * @returns {error: string|null} - ошибка или null
 */
import { removeDoc } from '../api'
import { sessions } from '../sessions'
import { ROLE } from '../../constants'

export const deleteDocument = async id => {
  const access = await sessions.checkAccess([ROLE.MASTER, ROLE.ADMIN])

  if (!access) {
    return {
      err: 'Access denied for delete operation!',
      res: null,
    }
  }

  return {
    err: removeDoc(id) ? null : '[PROXY] Document did not create',
  }
}
