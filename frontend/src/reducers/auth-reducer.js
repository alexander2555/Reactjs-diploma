import { ACTION_TYPE } from '../actions'
import { ROLE } from '../constants'

const initialAuthState = {
  id: null,
  login: null,
  roleId: ROLE.GUEST,
  session: null,
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
