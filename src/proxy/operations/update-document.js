/**
 * Обновление документа
 *
 * @param {id: string}
 * @param {data: object}
 * @returns {error: string|null, res: object|null} - объект документа или null
 */
import { ROLE } from '../../constants'
import { updDoc } from '../api'
import { sessions } from '../sessions'

export const updateDocument = async (id, data) => {
  const access = await sessions.checkAccess([
    ROLE.MASTER,
    ROLE.ADMIN,
    ROLE.USER,
  ])

  if (!access) {
    return {
      err: 'Access denied for update operation!',
      res: null,
    }
  }

  const docData = await updDoc(id, data)

  if (!docData) {
    return {
      err: '[PROXY] Document did not update',
      res: null,
    }
  }

  return {
    err: null,
    res: docData,
  }
}
