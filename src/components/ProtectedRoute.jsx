import { useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'

import { Loader } from '.'

import { selectAuthData, selectUserRole } from '../selectors'

import { ROLE } from '../constants'

export const ProtectedRoute = ({ children, redirectTo = '/login', requireRole }) => {
  const docId = useParams().id
  const { isPending } = useSelector(selectAuthData)
  const roleId = useSelector(selectUserRole)

  if ((requireRole && roleId !== requireRole) || (roleId === ROLE.GUEST && !docId))
    return <Navigate to={redirectTo} replace />

  return isPending ? <Loader message='Проверка...' /> : children
}
