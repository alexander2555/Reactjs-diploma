import { setDocData } from '.'

import { apiRequest } from '../../utils/api'

export const saveDocAsync =
  ({ id, elements, ...docData }, nav) =>
  async dispatch => {
    try {
      const doc =
        id !== undefined && id !== null
          ? await apiRequest(`documents/${id}`, { method: 'PATCH', body: docData })
          : await apiRequest('documents', { method: 'POST', body: docData })

      if (id && elements && elements.length) {
        const updatePayload = elements
          .filter(el => el.update)
          .map(({ update, ...elData }) => ({ ...elData, doc_id: id }))

        if (updatePayload.length) {
          await Promise.all(
            updatePayload.map(el =>
              apiRequest(`doc_el/${el.id}`, { method: 'PATCH', body: el }),
            ),
          )
        }
      }

      dispatch(
        setDocData({
          updatedAt: doc.updated_at || doc.updatedAt,
          changed: false,
        }),
      )

      if (!id && doc?.id) nav(`/document/${doc.id}`, { replace: true })
    } catch (err) {
      console.warn('[ACTIONS] Document saving errors:', err.message)
    }
  }
