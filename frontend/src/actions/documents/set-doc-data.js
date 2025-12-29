import { ACTION_TYPE } from '..'

export const setDocData = document => ({
  type: ACTION_TYPE.SET_DOC_DATA,
  payload: document,
})
