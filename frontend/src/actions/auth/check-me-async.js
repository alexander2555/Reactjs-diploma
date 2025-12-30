import { setPending, setSession } from '.'

import { apiRequest } from '../../utils/api'
import { ROLE } from '../../constants'

export const checkMeAsync = () => async dispatch => {
  dispatch(setPending(true))
  try {
    const res = await apiRequest('me')
    if (res) {
      const normalized = normalizeUser(res)
      persistSession(normalized)
      dispatch(setSession(normalized))
    }
  } catch (err) {
    console.warn('[ACTION me async] error:', err.message)
    clearSession()
  } finally {
    dispatch(setPending(false))
  }
}

function normalizeUser(user) {
  const roleId = user.roleId ?? user.role_id ?? ROLE.GUEST
  return { id: user.id, login: user.login, roleId, session: createSessionId() }
}

function persistSession(user) {
  try {
    sessionStorage.setItem('sessionData', JSON.stringify(user))
  } catch (err) {
    console.warn('[AUTH] persist session', err)
  }
}

function clearSession() {
  try {
    sessionStorage.removeItem('sessionData')
  } catch (err) {
    console.warn('[AUTH] clear session', err)
  }
}

function createSessionId() {
  return Math.random().toString(36).slice(2)
}
