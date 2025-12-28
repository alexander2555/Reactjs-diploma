import { ACTION_TYPE } from '..'

export const setAuthError = error => ({
  type: ACTION_TYPE.SET_ERROR,
  payload: error,
})
