import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { resetDocData, setDocData } from '../actions'
import { selectUserId, selectUserRole } from '../selectors'

import { checkAccess } from '../utils'

import { ROLE } from '../constants'
import { apiRequest } from '../utils/api'

export const useInitDoc = docId => {
  const dispatch = useDispatch()

  const userId = useSelector(selectUserId)
  const roleId = useSelector(selectUserRole)

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState([])

  const prepDocPageData = useCallback(
    async isCancelled => {
      setIsLoading(true)
      try {
        const resDoc = docId
          ? await fetchDocWithElements(docId)
          : { title: 'Новый коллаж', owner_id: userId, elements: [] }

        if (isCancelled) return

        // Уровень доступа к документу
        const removable = checkAccess([ROLE.ADMIN], roleId) || resDoc.owner_id === userId
        const editable = removable || resDoc.editor_id === userId
        // Диспатч документа в стор
        dispatch(
          setDocData({
            ...resDoc,
            editable,
            removable,
          }),
        )

        if (!isCancelled) setIsLoading(false)
      } catch (err) {
        if (isCancelled) return
        setError(err.message)
        setIsLoading(false)
      }
    },
    [docId, userId, roleId],
  )

  useEffect(() => {
    let isCancelled = false

    prepDocPageData(isCancelled)

    return () => {
      isCancelled = true
      dispatch(resetDocData())
    }
  }, [])

  return { isLoading, error }
}

async function fetchDocWithElements(docId) {
  const doc = await apiRequest(`documents/${docId}`)
  const elements = await apiRequest(`doc_el?doc_id=${docId}`)
  return {
    ...doc,
    elements: elements?.map(({ doc_id, ...rest }) => rest) || [],
  }
}
