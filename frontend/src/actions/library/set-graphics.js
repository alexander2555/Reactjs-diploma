import { ACTION_TYPE } from '..'

export const setGraphics = graphicsArray => ({
  type: ACTION_TYPE.SET_GRAPHICS,
  payload: graphicsArray,
})
