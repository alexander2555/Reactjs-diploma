/**
 * Создание нового документа
 *
 * @param {data: object} - объект данных документа
 * @returns {error: string|null, res: object|null} - объект документа или null
 */
import { addDoc } from '../api'
import { sessions } from '../sessions'
import { ROLE } from '../../constants'

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
      err: '[PROXY] Document did not create',
      res: null,
    }
  }

  return {
    err: null,
    res: docData,
  }
}
