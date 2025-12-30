/**
 * Удаление элемента из библиотеки
 *
 * @param {id: number}
 * @returns {error: string|null} - ошибка или null
 */
import { removeElement } from '../api'
import { sessions } from '../sessions'
import { ROLE } from '../../constants'

export const deleteElement = async id => {
  const access = await sessions.checkAccess([ROLE.EDITOR, ROLE.MASTER, ROLE.ADMIN])

  if (!access) {
    return { err: '[PROXY] Access denied for delete operation!' }
  }

  return {
    err: removeElement(id) ? null : '[PROXY] Element did not create',
  }
}
