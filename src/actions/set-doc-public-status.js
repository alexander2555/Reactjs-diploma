import { ACTION_TYPE } from '../constants'

export const setDocPublicStatus = pubStatus => ({
  type: ACTION_TYPE.SET_DOC_PUBLIC_STATUS,
  payload: pubStatus,
})
