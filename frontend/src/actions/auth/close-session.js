import { ACTION_TYPE } from '..'

import { apiRequest } from '../../utils/api'

export const closeSession = () => {
  apiRequest('logout', { method: 'POST' }).catch(err =>
    console.warn('[ACTION logout]', err),
  )

  try {
    sessionStorage.removeItem('sessionData')
  } catch (err) {
    console.warn('[AUTH] clear session', err)
  }

  return {
    type: ACTION_TYPE.CLOSE_SESSION,
  }
}
