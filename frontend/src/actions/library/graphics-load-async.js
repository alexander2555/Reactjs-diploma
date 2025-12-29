import { setGraphics } from './set-graphics'
import { proxy } from '../../proxy'

export const graphicsLoadAsync = isCancelled => async dispatch => {
  const { res, err } = await proxy.fetchElements()

  if (isCancelled) return

  if (err) {
    console.warn('[ACTIONS] Graphics load error', err)
    return { err }
  }

  if (!(res || res?.length)) ({ err: '[ACTIONS] Graphics array is empty' })

  dispatch(setGraphics(res))

  return { err: null }
}
