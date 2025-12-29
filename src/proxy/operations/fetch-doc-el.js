/**
 * Запрос списка графических элементов в документах
 *
 * @param {elId: string}
 * @returns {error: string|null, res: object|null} - массив элементов или null
 */

import { getDocEl } from '../api'

export const fetchDocEl = async elId => {
  const docEl = await getDocEl(elId)

  if (!docEl?.length) {
    return { res: null }
  }

  return { res: docEl }
}
