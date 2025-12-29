import { useContext, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import { selectGraphicsLib, selectUserId, selectUserRole } from '../selectors'

import { LibContext } from '../context'

import { ROLE } from '../constants'

export const useLibrary = () => {
  return useContext(LibContext)
}

export const LibProvider = ({ children }) => {
  const userId = useSelector(selectUserId)
  const roleId = useSelector(selectUserRole)
  const graphicsLib = useSelector(selectGraphicsLib)

  const [removable, setRemovable] = useState(false)
  const [libLoading, setLibLoading] = useState('')
  const [libError, setLibError] = useState(null)
  const [filteredLib, setFilterLib] = useState([])
  const libRef = useRef({})

  if (libError) console.warn(libError)

  // Фильтр библиотеки элементов по правам пользователя
  useEffect(() => {
    setFilterLib(
      graphicsLib.filter(
        el => el.public || el.owner_id === userId || ROLE.ADMIN === roleId,
      ),
    )
  }, [roleId, userId, graphicsLib])

  return (
    <LibContext
      value={{
        libLoading,
        setLibLoading,
        libError,
        setLibError,
        removable,
        setRemovable,
        libRef,
        filteredLib,
        setFilterLib,
      }}
    >
      {children}
    </LibContext>
  )
}
