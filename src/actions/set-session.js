import { ACTION_TYPE } from '../constants'

export const setSession = user => ({
  type: ACTION_TYPE.SET_SESSION,
  payload: user,
})
