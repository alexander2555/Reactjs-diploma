import { ACTION_TYPE } from '../actions'
import { createDefaultDocState } from '../constants'

const initialDocState = createDefaultDocState()

export const docReducer = (state = initialDocState, { type, payload }) => {
  switch (type) {
    case ACTION_TYPE.SET_DOC_DATA: {
      return { ...state, ...payload }
    }
    case ACTION_TYPE.SET_DOC_CHANGED: {
      return { ...state, changed: true }
    }
    case ACTION_TYPE.SET_DOC_PUBLIC_STATUS: {
      return { ...state, public: payload }
    }
    case ACTION_TYPE.RESET_DOC_DATA: {
      return createDefaultDocState()
    }
    default:
      return state
  }
}
