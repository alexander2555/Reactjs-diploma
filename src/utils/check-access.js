export const checkAccess = (allowedRoles = [], userRole) => {
  if (!allowedRoles.length) return true
  if (userRole === undefined) return false

  return allowedRoles.includes(userRole)
}
