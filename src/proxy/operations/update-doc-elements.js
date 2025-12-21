/**
 * Обновление элементов документа
 *
 * @param {id: string}
 * @param {docElementsData: object[]}
 * @returns {error: string|null, res: object[]|null} - массив элементов или null
 */
import { ROLE } from '../../constants'
import { updDocEl } from '../api'
import { sessions } from '../sessions'

export const updateDocElements = async (docId, docElementsData) => {
  const access = await sessions.checkAccess([
    ROLE.MASTER,
    ROLE.ADMIN,
    ROLE.USER,
  ])

  if (!access) {
    return {
      err: '[PROXY] Access denied for update operation!',
      res: null,
    }
  }

  // Выбираем только элементы для обновления, добавляем doc_id
  const updData = docElementsData
    .filter(el => el.update)
    .map(el => ({ ...el, doc_id: docId }))

  const docElData = await updDocEl(updData)

  if (!docElData) {
    return {
      err: '[PROXY] Document elements did not update',
      res: null,
    }
  }

  return {
    err: null,
    res: docElData,
  }
}
