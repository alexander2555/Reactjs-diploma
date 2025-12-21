/**
 * Создание нового документа
 *
 * @param {string}
 * @param {string}
 * @returns {error: string|null, res: object|null} - объект документа или null
 */
import { ROLE } from '../../constants'
import { addDoc } from '../api'
import { sessions } from '../sessions'

export const createDocument = async data => {
  const access = await sessions.checkAccess([ROLE.MASTER, ROLE.ADMIN])

  if (!access) {
    return {
      err: 'Access denied for create operation!',
      res: null,
    }
  }

  const docData = await addDoc(data)

  if (!docData) {
    return {
      err: 'Document did not create',
      res: null,
    }
  }

  return {
    err: null,
    res: docData,
  }
}
