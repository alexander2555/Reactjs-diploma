/**
 * Обновление элементов документа
 *
 * @param {docId: string}
 * @param {docElementsData: object[]}
 * @returns {error: string|null, res: object[]|null} - массив элементов или null
 */
import { updDocEl } from '../api'
import { sessions } from '../sessions'
import { ROLE } from '../../constants'

export const updateDocElements = async (docId, docElementsData) => {
  const access = await sessions.checkAccess([ROLE.MASTER, ROLE.ADMIN, ROLE.EDITOR])

  if (!access) {
    return {
      err: '[PROXY] Access denied for update elements!',
      res: null,
    }
  }

  // Выбираем только элементы для обновления, добавляем doc_id
  const updData = docElementsData
    .filter(el => el.update)
    .map(({ update, ...elData }) => ({ ...elData, doc_id: docId }))

  const docElData = await updDocEl(updData)

  // TODO - добавить создание новых doc_el по el.create

  // TODO - добавить удаление doc_el по el.delete

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
