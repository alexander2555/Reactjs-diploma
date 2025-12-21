import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetDocData, setDocData } from '../actions'
import { selectUser } from '../selectors'

import { proxy } from '../proxy'
import { checkAccess } from '../utils/check-access'
import { ROLE } from '../constants'

export const useInitDoc = docId => {
  const dispatch = useDispatch()

  const user = useSelector(selectUser)

  const [lib, setLib] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState([])

  const prepDocPageData = async cancelled => {
    setIsLoading(true)
    const [{ err: errLib, res: resLib }, { err: errDoc, res: resDoc }] =
      await Promise.all([
        // Получение библиотеки графических элементов (массив)
        proxy.fetchElements(),
        // Получение данных документа
        docId
          ? proxy.fetchDocument(docId)
          : { res: { title: 'Новый коллаж', owner_id: user.id } },
      ])

    if (cancelled) return

    let err = []
    if (errLib) err.push(errLib)
    if (errDoc) err.push(errDoc)
    setError(err)

    // Вывод библиотеки (списка) элементов в боковую панель
    setLib(resLib || {})

    // Уровень доступа к документу
    const removable =
      checkAccess([ROLE.ADMIN], user.roleId) || resDoc.owner_id === user.id
    const editable = removable || resDoc.editor_id === user.id
    // Диспатч документа в стор
    dispatch(
      setDocData({
        ...resDoc,
        editable,
        removable,
      }),
    )

    if (!cancelled) setIsLoading(false)
  }

  useEffect(() => {
    let cancelled = false

    prepDocPageData(cancelled)

    return () => {
      cancelled = true
      dispatch(resetDocData())
    }
  }, [])

  return { isLoading, lib, error }
}
