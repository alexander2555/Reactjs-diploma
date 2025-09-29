import { ACTION } from '../constants'
import { server } from '../proxy'

export const closeSession = hash => {
  server.signout(hash)

  return {
    type: ACTION.CLOSE_SESSION,
    payload: hash,
  }
}
