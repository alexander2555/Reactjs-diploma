import { setPending, setAuthError, setSession } from '.'

import { proxy } from '../../proxy'

export const registerAsync =
  ({ login, password, role }) =>
  async dispatch => {
    dispatch(setPending(true))
    try {
      const { res, err } = await proxy.register(login, password, Number(role))

      if (err) {
        throw new Error(err)
      }

      dispatch(setAuthError(null))
      dispatch(setSession(res))
    } catch (err) {
      console.warn('[Reg action] error:', err.message)
      dispatch(setAuthError(err.message))
    } finally {
      dispatch(setPending(false))
    }
  }
