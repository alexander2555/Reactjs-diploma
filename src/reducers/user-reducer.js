import { ACTION_TYPE, ROLE } from '../constants'

const initialUserState = {
  id: null,
  login: null,
  roleId: ROLE.GUEST,
  session: null,
}

export const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_SESSION:
      return { ...state, ...action.payload }
    case ACTION_TYPE.CLOSE_SESSION: {
      return initialUserState
    }
    default:
      return state
  }
}
