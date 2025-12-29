import { ROLE } from '../../constants'

export const getUserDocRights = currentUser => {
  const userRoleId = currentUser?.role_id ?? ROLE.GUEST
  const userId = currentUser?.id

  const isRemovable = doc =>
    ROLE.ADMIN === userRoleId || doc.owner_id === userId
  const isEditable = doc => isRemovable(doc) || doc.editor_id === userId
  const isReadable = doc => isEditable(doc) || doc.public

  return {
    isRemovable,
    isEditable,
    isReadable,
    addDocRights: doc => ({
      ...doc,
      editable: isEditable(doc),
      removable: isRemovable(doc),
    }),
  }
}
