import axios from 'axios';
import { updateBalance } from './user';
import { requestInInterval } from '../../utils';

// Constants
import { REMOVE_USER } from './';
const SET_TRANSACTIONS = 'SET_TRANSACTIONS';
const ADD_TRANSACTION = 'ADD_TRANSACTION';
const ADD_STOCK_PRICE = 'ADD_STOCK_PRICE';
const SET_CURRENT_PRICES = 'SET_CURRENT_PRICES';
const SET_INTERVAL_TO_CLEAR = 'SET_INTERVAL_TO_CLEAR';

// Actions
import { setError } from './error';
const setTransactions = transactions => ({
  type: SET_TRANSACTIONS,
  transactions,
});

const addStockPrice = stock => ({
  type: ADD_STOCK_PRICE,
  stock,
});

const addTransaction = transaction => ({
  type: ADD_TRANSACTION,
  transaction,
});

const setCurrentPrices = prices => ({
  type: SET_CURRENT_PRICES,
  prices,
});

// Thunks
export const getTransactions = () => async (dispatch, getState) => {
  try {
    const { user } = getState();
    const { data } = await axios.get(`/api/user/${user.id}/transactions`);
    dispatch(setTransactions(data));
  } catch (err) {
    dispatch(setError(err));
  }
};

const getStockPrice = ticker => async dispatch => {
  try {
    const { data } = await axios.get(
      `https://api.iextrading.com/1.0/stock/market/batch?symbols=${ticker}&types=quote&filter=open,latestPrice`
    );
    dispatch(addStockPrice(data));
  } catch (err) {
    dispatch(setError(err));
  }
};

export const buyStock = stock => async (dispatch, getState) => {
  try {
    const { user } = getState();
    const { data } = await axios.post(
      `/api/user/${user.id}/transactions`,
      stock
    );

    const balance = user.balance - data.price * data.shares;
    await dispatch(updateBalance(balance));
    await dispatch(getStockPrice(data.ticker));
    await dispatch(addTransaction(data));
    const { transactions } = getState();
    if (transactions.all.length === 1) {
      console.log('STARTING INTERVAL');
      requestInInterval();
    }
  } catch (err) {
    dispatch(setError(err));
  }
};

export const getCurrPrices = () => async (dispatch, getState) => {
  try {
    const { user } = getState();
    const { data } = await axios.get(
      `/api/user/${user.id}/transactions/tickers`
    );
    if (data.length) {
      const currPrices = await axios.get(
        `https://api.iextrading.com/1.0/stock/market/batch?symbols=${data.join(
          ','
        )}&types=quote&filter=open,latestPrice`
      );
      dispatch(setCurrentPrices(currPrices.data));
    }
  } catch (err) {
    dispatch(setError(err));
  }
};

// Reducer
const defaultState = {
  all: [],
  currPrices: {},
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_TRANSACTIONS:
      return { ...state, all: action.transactions };
    case ADD_STOCK_PRICE:
      return {
        ...state,
        currPrices: {
          ...state.currPrices,
          ...action.stock,
        },
      };
    case ADD_TRANSACTION:
      return {
        ...state,
        all: [...state.all, action.transaction],
      };
    case SET_CURRENT_PRICES:
      return {
        ...state,
        currPrices: action.prices,
      };
    case SET_INTERVAL_TO_CLEAR:
      return {
        ...state,
        interval: action.interval,
      };
    case REMOVE_USER:
      return defaultState;
    default:
      return state;
  }
};

export default reducer;
