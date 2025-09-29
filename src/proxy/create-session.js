import { addCollage } from './session/add-collage'
import { ROLE } from '../constants'

export const createSession = roleId => {
  const session = {
    logout() {
      Object.keys(session).forEach(key => delete session[key])
    },
  }

  switch (roleId) {
    case ROLE.ADMIN:
      session.addCollage = addCollage
      break
    case ROLE.MASTER:
      break
    case ROLE.USER:
      break
    default:
  }

  return session
}
