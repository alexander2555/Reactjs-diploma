/**
 * Добавление нового элемента
 *
 * @param {data: object} - объект данных элемента
 * @returns {error: string|null, res: object|null} - объект элемента или null
 */
import { addElement } from '../api'
import { sessions } from '../sessions'
import { ROLE } from '../../constants'

export const createElelement = async data => {
  const access = await sessions.checkAccess([ROLE.MASTER, ROLE.ADMIN, ROLE.EDITOR])

  if (!access) {
    return {
      err: '[PROXY] Access denied for create element operation!',
      res: null,
    }
  }

  const elData = await addElement(data)

  if (!elData) {
    return {
      err: '[PROXY] Element did not create',
      res: null,
    }
  }

  return {
    err: null,
    res: elData,
  }
}
