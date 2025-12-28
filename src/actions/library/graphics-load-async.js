import { setGraphics } from './set-graphics'
import { proxy } from '../../proxy'

import { ROLE } from '../../constants'
import { setPending } from '../auth'

export const graphicsLoadAsync = isCancelled => async dispatch => {
  setPending(true)
  const { res: user, err: accessErr } = await proxy.me()

  if (accessErr) console.warn('[ACTIONS] Graphics load access error', accessErr)

  const { res, err } = await proxy.fetchElements()

  if (isCancelled) return

  if (err) {
    console.warn('[ACTIONS] Graphics load error', err)
    return { err }
  }

  if (!(res || res?.length)) ({ err: '[ACTIONS] Graphics array is empty' })

  dispatch(
    setGraphics(
      res.filter(
        el => el.public || el.owner_id === user.id || ROLE.ADMIN === user.roleId,
      ),
    ),
  )

  if (!isCancelled) setPending(false)

  return { err: null }
}
