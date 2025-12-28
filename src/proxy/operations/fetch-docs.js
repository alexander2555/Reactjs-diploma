/**
 * Запрос списка документов
 *
 * @returns {error: string|null, res: object|null} - объект с массивом документов или null
 */

import { getDocs, getUser } from '../api'
import { sessions } from '../sessions'
import { getUserDocRights } from '../utils'

export const fetchDocs = async () => {
  const currentUser = sessions.currentLogin()
    ? await getUser(sessions.currentLogin())
    : null

  const { isReadable, addDocRights } = getUserDocRights(currentUser)

  const docs = (await getDocs()).filter(isReadable).map(addDocRights)

  if (!(docs && docs.length)) {
    return {
      error: '[PROXY] Docs not found',
      res: null,
    }
  }

  return {
    error: null,
    res: docs,
  }
}
