import { setPending, setAuthError, setSession } from '.'

import { apiRequest } from '../../utils/api'
import { ROLE } from '../../constants'
import { getHash } from '../../utils/get-hash'

export const loginAsync =
  ({ login, password }) =>
  async dispatch => {
    dispatch(setPending(true))
    try {
      const user = await apiRequest('login', {
        method: 'POST',
        body: { login, password },
      })

      const normalized = normalizeUser(user)
      persistSession(normalized)

      dispatch(setAuthError(null))
      dispatch(setSession(normalized))
    } catch (err) {
      console.warn('[ACTIONS] Login', err.message)
      dispatch(setAuthError(err.message))
    } finally {
      dispatch(setPending(false))
    }
  }

function normalizeUser(user) {
  const roleId = user.roleId ?? ROLE.GUEST
  return { id: user.id, login: user.login, roleId, session: getHash(16) }
}

function persistSession(user) {
  try {
    sessionStorage.setItem('sessionData', JSON.stringify(user))
  } catch (err) {
    console.warn('[AUTH] persist session', err)
  }
}
