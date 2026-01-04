import { setDocData } from '.'

import { apiRequest } from '../../utils'
import { mapDoc, mapDocElement } from '../../helpers'

export const saveDocAsync =
  ({ id, elements, ...docData }, nav) =>
  async dispatch => {
    try {
      const body = mapDoc({
        ...docData,
        elements: elements.map(mapDocElement),
      })

      const doc = id
        ? await apiRequest(`documents/${id}`, { method: 'PATCH', body })
        : await apiRequest('documents', { method: 'POST', body })

      dispatch(
        setDocData({
          ...doc,
          changed: false,
        }),
      )

      if (!id && doc?.id) nav(`/document/${doc.id}`, { replace: true })
    } catch (err) {
      console.warn('[ACTIONS] Document saving', err.message)
    }
  }
