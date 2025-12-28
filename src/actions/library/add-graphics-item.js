import { ACTION_TYPE } from '..'

export const addGraphicsItem = itemData => ({
  type: ACTION_TYPE.ADD_GRAPHICS_ITEM,
  payload: itemData,
})
