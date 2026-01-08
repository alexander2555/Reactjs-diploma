import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { resetDocData, setDocData } from '../actions'
import { selectUserId, selectUserRole } from '../selectors'

import { checkAccess, apiRequest } from '../utils'

import { ROLE } from '../constants'

export const useInitDoc = docId => {
  const dispatch = useDispatch()

  const userId = useSelector(selectUserId)
  const roleId = useSelector(selectUserRole)

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const prepDocPageData = useCallback(
    async isCancelled => {
      setIsLoading(true)
      try {
        const resDoc = docId
          ? await apiRequest(`documents/${docId}`)
          : { title: 'Новый коллаж', owner_id: userId, elements: [] }

        if (isCancelled) return

        // Уровень доступа к документу
        const removable =
          userId && (checkAccess([ROLE.ADMIN], roleId) || resDoc.owner_id === userId)
        const editable = userId && (removable || resDoc.editor_id === userId)
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
        setError(`[API] ${err.message}`)
      } finally {
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
