import { ACTION_TYPE } from '..'

import { apiRequest } from '../../utils/api-request'

export const closeSession = () => {
  apiRequest('logout', { method: 'POST' }).catch(err =>
    console.warn('[ACTIONS] Logout', err),
  )

  return {
    type: ACTION_TYPE.CLOSE_SESSION,
  }
}
