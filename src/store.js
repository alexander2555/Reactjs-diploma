import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from 'redux'
import { thunk } from 'redux-thunk'
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

const composerEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
  reducer,
  composerEnhancers(applyMiddleware(thunk)),
)
