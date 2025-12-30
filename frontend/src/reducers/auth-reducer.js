import { ACTION_TYPE } from '../actions'
import { ROLE } from '../constants'

const loadSessionFromSessionStorage = () => {
  if (typeof sessionStorage === 'undefined') return null
  try {
    const raw = sessionStorage.getItem('sessionData')
    return raw ? JSON.parse(raw) : null
  } catch (err) {
    console.warn('[AUTH] load session', err)
    return null
  }
}

const storedSession = loadSessionFromSessionStorage()

const initialAuthState = {
  id: storedSession?.id ?? null,
  login: storedSession?.login ?? null,
  roleId: storedSession?.roleId ?? storedSession?.role_id ?? ROLE.GUEST,
  session: storedSession?.session ?? null,
  isPending: true,
  error: null,
}

export const authReducer = (state = initialAuthState, { type, payload }) => {
  switch (type) {
    case ACTION_TYPE.SET_PENDING:
      return { ...state, isPending: payload }
    case ACTION_TYPE.SET_ERROR:
      return { ...state, error: payload }
    case ACTION_TYPE.SET_SESSION:
      return { ...state, ...payload }
    case ACTION_TYPE.CLOSE_SESSION: {
      return initialAuthState
    }
    default:
      return state
  }
}
