import { ROLE } from '../constants'
import { getUser } from './api'

export const sessions = {
  remove() {
    sessionStorage.removeItem('sessionData')
  },
  create({ login }) {
    const hash =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)

    sessionStorage.setItem('sessionData', JSON.stringify({ [hash]: login }))

    return hash
  },
  currentLogin() {
    return sessionStorage.getItem('sessionData')
      ? Object.values(JSON.parse(sessionStorage.getItem('sessionData')))[0]
      : null
  },
  async checkAccess(accessRoles) {
    const currentLogin = this.currentLogin()
    const currentRoleId = currentLogin
      ? (await getUser(currentLogin)).role_id
      : ROLE.GUEST

    return accessRoles.includes(currentRoleId)
  },
}
