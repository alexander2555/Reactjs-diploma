/**
 * Запрос списка графических элементов документа
 *
 * @returns {error: string|null, res: object|null} - объект с массивом элементов или null
 */

import { getDoc } from '../api'

export const fetchDocument = async docId => {
  const [doc, elements] = await getDoc(docId)

  if (!(doc && doc.length)) {
    return {
      err: 'Document not found',
      res: null,
    }
  }

  return {
    err: null,
    res: {
      ...doc[0],
      // Исключаем doc_id из массива элементов
      elements: [...elements.map(({ doc_id, ...el_data }) => ({ ...el_data }))],
    },
  }
}
