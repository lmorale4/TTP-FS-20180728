import axios from 'axios';
import { updateBalance } from './user';
import { clearingInterval, requestInInterval } from '../../utils';

// Constants
import { REMOVE_USER } from './';
const SET_TRANSACTIONS = 'SET_TRANSACTIONS';
const ADD_TRANSACTION = 'ADD_TRANSACTION';
const ADD_STOCK_PRICE = 'ADD_STOCK_PRICE';
const SET_CURRENT_PRICES = 'SET_CURRENT_PRICES';
const SET_INTERVAL_TO_CLEAR = 'SET_INTERVAL_TO_CLEAR';

// Actions
import { setError } from './error';
import { fetching } from './isFetching';
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
    dispatch(fetching(true));
    const { data } = await axios.get(`/api/user/${user.id}/transactions`);
    dispatch(setTransactions(data));
    dispatch(fetching(false));
  } catch (err) {
    dispatch(fetching(false));
    dispatch(setError(err.response));
  }
};

const getStockPrice = ticker => async dispatch => {
  try {
    dispatch(fetching(true));
    const { data } = await axios.get(
      `https://api.iextrading.com/1.0/stock/market/batch?symbols=${ticker}&types=quote&filter=open,latestPrice`
    );
    dispatch(addStockPrice(data));
    dispatch(fetching(false));
  } catch (err) {
    dispatch(fetching(false));
    dispatch(setError(err.response));
  }
};

export const buyStock = stock => async (dispatch, getState) => {
  try {
    const { user } = getState();
    dispatch(fetching(true));
    const balance =
      (user.balance * 100 - Math.round(+stock.price * 100) * +stock.shares) /
      100;
    console.log(
      'BALANCE',
      user.balance,
      'PRICE',
      stock.price,
      'SHARES',
      stock.shares,
      '=',
      balance
    );
    const { data } = await axios.post(`/api/user/${user.id}/transactions`, {
      ...stock,
      balance,
    });

    await dispatch(updateBalance(balance));
    await dispatch(getStockPrice(data.ticker));
    await dispatch(addTransaction(data));
    const { transactions } = getState();
    if (transactions.all.length === 1) {
      clearingInterval();
      requestInInterval();
    }
    dispatch(fetching(false));
  } catch (err) {
    dispatch(fetching(false));
    dispatch(setError(err.response));
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
    dispatch(fetching(false));
    dispatch(setError(err.response));
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
