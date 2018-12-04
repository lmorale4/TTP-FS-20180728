import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggingMiddleware from 'redux-logger';

import user from './user';
import transactions from './transactions';
import tickers from './tickers';

const reducer = combineReducers({
  user,
  transactions,
  tickers,
});

export default createStore(
  reducer,
  applyMiddleware(thunkMiddleware, loggingMiddleware)
);
