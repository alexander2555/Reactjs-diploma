import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { resetDocData, setDocData } from '../actions'
import { selectUserId, selectUserRole } from '../selectors'

import { proxy } from '../proxy'

import { checkAccess } from '../utils'

import { ROLE } from '../constants'

export const useInitDoc = docId => {
  const dispatch = useDispatch()

  const userId = useSelector(selectUserId)
  const roleId = useSelector(selectUserRole)

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState([])

  const prepDocPageData = useCallback(
    async isCancelled => {
      setIsLoading(true)
      const { err: errDoc, res: resDoc } = docId
        ? await proxy.fetchDocument(docId)
        : { res: { title: 'Новый коллаж', owner_id: userId } }

      if (isCancelled) return

      if (errDoc) setError(errDoc)

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
