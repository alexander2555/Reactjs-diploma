import { ACTION } from '../constants'

export const setSession = user => ({
  type: ACTION.SET_SESSION,
  payload: user,
})
