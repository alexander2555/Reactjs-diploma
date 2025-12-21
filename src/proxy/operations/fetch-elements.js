/**
 * Запрос списка графических элементов
 *
 * @returns {error: string|null, res: object|null} - объект с массивом элементов или null
 */

import { getElements } from '../api'

export const fetchElements = async id => {
  const graphics = await getElements(id)

  if (!(graphics && graphics.length)) {
    return {
      err: 'Graphics elements not found',
      res: null,
    }
  }

  return {
    err: null,
    res: id ? graphics[0] : graphics,
  }
}
