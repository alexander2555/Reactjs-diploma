import { ACTION_TYPE } from '..'

export const removeGraphicsItem = itemId => ({
  type: ACTION_TYPE.REMOVE_GRAPHICS_ITEM,
  payload: itemId,
})
