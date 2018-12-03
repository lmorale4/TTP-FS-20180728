import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggingMiddleware from 'redux-logger';

import user from './user';

const reducer = combineReducers({
  user,
});

export default createStore(
  reducer,
  applyMiddleware(thunkMiddleware, loggingMiddleware)
);
