import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

import { Loader } from '.'

import { selectAuthData, selectUserRole } from '../selectors'

import { ROLE } from '../constants'

export const ProtectedRoute = ({
  children,
  redirectTo = '/login',
  requireRoles = [],
}) => {
  const location = useLocation()

  const { isPending } = useSelector(selectAuthData)

  const roleId = useSelector(selectUserRole)

  if (roleId === ROLE.GUEST)
    return <Navigate to={redirectTo} state={{ from: location.pathname }} replace />
  if (requireRoles.length && !requireRoles.includes(roleId))
    return <Navigate to='/' state={{ from: location.pathname }} replace />

  return isPending ? <Loader message='Проверка...' /> : children
}
