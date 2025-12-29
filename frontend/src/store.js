import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { withExtraArgument as thunk } from 'redux-thunk'
import { authReducer, docReducer, graphicsReducer } from './reducers'

const reducer = combineReducers({
  auth: authReducer,
  document: docReducer,
  graphics: graphicsReducer,
})

const composerEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const createAppStore = () =>
  createStore(reducer, composerEnhancers(applyMiddleware(thunk())))
