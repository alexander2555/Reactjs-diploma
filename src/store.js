import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { thunk } from 'redux-thunk'
import { userReducer, docsReducer, docReducer, graphReducer } from './reducers'

const reducer = combineReducers({
  user: userReducer,
  document: docReducer,
  documents: docsReducer,
  graphics: graphReducer,
})

const composerEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(reducer, composerEnhancers(applyMiddleware(thunk)))
