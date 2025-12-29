import { setPending, setSession } from '.'

import { proxy } from '../../proxy'

export const checkMeAsync = () => async dispatch => {
  dispatch(setPending(true))
  const { res, err } = await proxy.me()

  if (err) {
    console.warn('[ACTION me async] error:', err.message)
  }

  if (res) dispatch(setSession(res))

  dispatch(setPending(false))
}
