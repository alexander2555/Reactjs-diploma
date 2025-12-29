import { ACTION_TYPE } from '..'

import { proxy } from '../../proxy'

export const closeSession = () => {
  proxy.logout()

  return {
    type: ACTION_TYPE.CLOSE_SESSION,
  }
}
