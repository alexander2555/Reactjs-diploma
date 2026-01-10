import { setDocData } from '.'

import { apiRequest } from '../../utils'
import { mapDoc, mapDocElement, generatePreview } from '../../helpers'
import { selectGraphicsLib } from '../../selectors'

export const saveDocAsync =
  ({ id, elements, ...docData }, nav) =>
  async (dispatch, getState) => {
    try {
      const actualDocSize = docData.size
      const graphicsLib = selectGraphicsLib(getState())

      let preview = undefined
      // выборка элементов и добавление в превью
      if (elements.some(el => el.create || el.update || el.delete)) {
        const actualElements = elements
          .filter(el => !el.delete && el.el_id)
          .map(el => {
            const graphicsItem = graphicsLib.find(g => g.id === el.el_id)
            return graphicsItem ? { ...el, imageUrl: graphicsItem.image_url } : null
          })
          .filter(Boolean)
        preview = await generatePreview(actualElements, actualDocSize, docData.bg_color)
      }

      const body = mapDoc({
        ...docData,
        preview,
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
