import { setDocData } from './set-doc-data'
import { proxy } from '../proxy'

export const saveDocAsync =
  ({ id, elements, ...docData }, nav) =>
  async dispatch => {
    // Массив запросов на сохранение документа
    const saveRequests = id
      ? [proxy.updateDocument(id, docData)]
      : [proxy.createDocument(docData)]

    // Если есть элементы для обновления, добавляем запрос на их обновление
    if (id && !!elements && elements.length) {
      saveRequests.push(proxy.updateDocElements(id, elements))
    }

    const results = await Promise.all(saveRequests)

    const err = results.filter(({ err }) => !!err).map(r => r.err)

    if (err && err.length) {
      console.warn('[ACTIONS] Document save errors:', ...err)
      return
    }

    dispatch(
      setDocData({
        updatedAt: results[0].updated_at,
        changed: false,
      }),
    )

    if (!id) nav(`/document/${id}`, { replace: true })
  }
