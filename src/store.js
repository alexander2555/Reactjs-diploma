import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { withExtraArgument as thunk } from 'redux-thunk'
import {
  userReducer,
  docsReducer,
  docReducer,
  graphicsReducer,
} from './reducers'

const reducer = combineReducers({
  user: userReducer,
  document: docReducer,
  documents: docsReducer,
  graphics: graphicsReducer,
})

const composerEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const createAppStore = nav =>
  createStore(reducer, composerEnhancers(applyMiddleware(thunk(nav))))
