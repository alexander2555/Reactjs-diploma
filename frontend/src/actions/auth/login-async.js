import { setPending, setAuthError, setSession } from '.'

import { apiRequest } from '../../utils'
import { mapUser } from '../../helpers'

export const loginAsync =
  ({ login, password }) =>
  async dispatch => {
    dispatch(setPending(true))
    try {
      const user = await apiRequest('login', {
        method: 'POST',
        body: { login, password },
      })

      const loggedInUser = mapUser(user)

      dispatch(setAuthError(null))
      dispatch(setSession(loggedInUser))
    } catch (err) {
      console.warn('[ACTIONS] Login', err.message)
      dispatch(setAuthError(err.message))
    } finally {
      dispatch(setPending(false))
    }
  }
