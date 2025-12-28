import { ACTION_TYPE } from '..'

export const setSession = userData => ({
  type: ACTION_TYPE.SET_SESSION,
  payload: userData,
})
