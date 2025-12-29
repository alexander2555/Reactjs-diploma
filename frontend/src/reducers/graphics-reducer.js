import { ACTION_TYPE } from '../actions'

const initialGraphicsState = {
  lib: [],
  isPending: false,
  error: null,
}

export const graphicsReducer = (state = initialGraphicsState, { type, payload }) => {
  switch (type) {
    case ACTION_TYPE.SET_PENDING:
      return { ...state, isPending: payload }
    case ACTION_TYPE.SET_ERROR:
      return { ...state, error: payload }
    case ACTION_TYPE.SET_GRAPHICS: {
      return { ...state, lib: payload }
    }
    case ACTION_TYPE.ADD_GRAPHICS_ITEM: {
      return { ...state, lib: [...state.lib, payload] }
    }
    case ACTION_TYPE.REMOVE_GRAPHICS_ITEM: {
      return { ...state, lib: state.lib.filter(el => el.id !== payload) }
    }
    default:
      return state
  }
}
