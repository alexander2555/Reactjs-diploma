import { removeGraphicsItem } from './remove-graphics-item'
import { proxy } from '../../proxy'

export const graphicsRemoveAsync = elId => async dispatch => {
  const { err } = await proxy.deleteElement(elId)

  if (err) {
    console.warn('[ACTIONS] Graphics removing error', err)
    return { err }
  }

  dispatch(removeGraphicsItem(elId))

  return { err: null }
}
