import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggingMiddleware from 'redux-logger';

import user from './user';
import transactions from './transactions';
import tickers from './tickers';
import error from './error';

export const REMOVE_USER = 'REMOVE_USER';
export const SET_ERROR = 'SET_ERROR';
export const REMOVE_ERROR = 'REMOVE_ERROR';

const reducer = combineReducers({
  user,
  transactions,
  tickers,
  error,
});

export default createStore(
  reducer,
  applyMiddleware(thunkMiddleware, loggingMiddleware)
);
