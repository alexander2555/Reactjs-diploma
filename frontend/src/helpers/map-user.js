import { ROLE } from '../constants'
import { getHash } from '../utils/get-hash'

export const mapUser = user => {
  const roleId = user.roleId ?? ROLE.GUEST
  return { id: user.id, login: user.login, roleId, session: getHash(16) }
}
