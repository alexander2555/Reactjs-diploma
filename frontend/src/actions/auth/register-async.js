import { setPending, setAuthError, setSession } from '.'

import { apiRequest } from '../../utils'
import { mapUser } from '../../helpers'

export const registerAsync =
  ({ login, password, role }) =>
  async dispatch => {
    dispatch(setPending(true))
    try {
      const user = await apiRequest('register', {
        method: 'POST',
        body: { login, password, role: Number(role) },
      })

      const newUser = mapUser(user)

      dispatch(setAuthError(null))
      dispatch(setSession(newUser))
    } catch (err) {
      console.warn('[ACTIONS] Register', err.message)
      dispatch(setAuthError(err.message))
    } finally {
      dispatch(setPending(false))
    }
  }
