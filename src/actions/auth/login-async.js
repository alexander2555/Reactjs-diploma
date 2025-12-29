import { setPending, setAuthError, setSession } from '.'

import { proxy } from '../../proxy'

export const loginAsync =
  ({ login, password }) =>
  async dispatch => {
    dispatch(setPending(true))
    try {
      const { res, err } = await proxy.login(login, password)

      if (err) {
        throw new Error(err)
      }

      dispatch(setAuthError(null))
      dispatch(setSession(res))
    } catch (err) {
      console.warn('[ACTIONS] Login', err.message)
      dispatch(setAuthError(err.message))
    } finally {
      dispatch(setPending(false))
    }
  }
