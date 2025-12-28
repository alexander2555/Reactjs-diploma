import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetDocData, setDocData } from '../actions'
import { selectUserId, selectUserRole } from '../selectors'

import { proxy } from '../proxy'
import { checkAccess } from '../utils/check-access'
import { ROLE } from '../constants'

export const useInitDoc = docId => {
  const dispatch = useDispatch()

  const userId = useSelector(selectUserId)
  const roleId = useSelector(selectUserRole)

  const [lib, setLib] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState([])

  const prepDocPageData = async isCancelled => {
    setIsLoading(true)
    const [{ err: errLib, res: resLib }, { err: errDoc, res: resDoc }] =
      await Promise.all([
        // Получение библиотеки графических элементов (массив)
        proxy.fetchElements(),
        // Получение данных документа
        docId
          ? proxy.fetchDocument(docId)
          : { res: { title: 'Новый коллаж', owner_id: userId } },
      ])

    if (isCancelled) return

    let err = []
    if (errLib) err.push(errLib)
    if (errDoc) err.push(errDoc)
    setError(err)

    // Вывод библиотеки (списка) элементов в боковую панель
    setLib(resLib || {})

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
  }

  useEffect(() => {
    let isCancelled = false

    prepDocPageData(isCancelled)

    return () => {
      isCancelled = true
      dispatch(resetDocData())
    }
  }, [])

  return { isLoading, lib, error }
}
