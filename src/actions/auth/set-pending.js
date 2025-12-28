import { ACTION_TYPE } from '..'

export const setPending = isPending => ({
  type: ACTION_TYPE.SET_PENDING,
  payload: isPending,
})
