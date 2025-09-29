import { ACTION, ROLE } from '../constants'

const initialUserState = {
  id: null,
  login: null,
  role_id: ROLE.GUEST,
  session: null,
}

export const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case ACTION.SET_SESSION:
      return { ...state, ...action.payload }
    case ACTION.CLOSE_SESSION: {
      return initialUserState
    }
    default:
      return state
  }
}
