import { ACTION_TYPE } from '../actions'

const initialDocState = {
  id: null,
  title: '',
  description: '',
  created_at: null,
  owner_id: null,
  editor_id: null,
  public: false,
  elements: [],
  changed: false,
  size: {
    width: 800,
    height: 1000,
  },
  bg_color: 'white',
}

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
      return initialDocState
    }
    default:
      return state
  }
}
