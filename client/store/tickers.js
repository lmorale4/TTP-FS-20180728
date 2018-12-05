import axios from 'axios';

// Constants
const SET_TICKERS = 'SET_TICKERS';
const SET_CURRENT_TICKER_PRICE = 'SET_CURRENT_TICKER_PRICE';

// Actions
import { setError } from './error';
const setTickers = tickers => ({
  type: SET_TICKERS,
  tickers,
});

const setCurrTickerPrice = price => ({
  type: SET_CURRENT_TICKER_PRICE,
  price,
});

// Thunks
export const getTickers = () => async dispatch => {
  try {
    const { data } = await axios.get(
      'https://api.iextrading.com/1.0/ref-data/symbols'
    );
    const tickers = data.map(item => item.symbol);
    dispatch(setTickers(tickers));
  } catch (err) {
    dispatch(setError(err));
  }
};

export const getPrice = ticker => async dispatch => {
  try {
    const { data } = await axios.get(
      `https://api.iextrading.com/1.0/stock/${ticker}/batch?types=quote&filter=open,latestPrice`
    );
    const { latestPrice } = data.quote;
    dispatch(setCurrTickerPrice(latestPrice));
  } catch (err) {
    dispatch(setError(err));
  }
};

// Reducer
const defaultState = {
  all: [],
  currentTickerPrice: 0,
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_TICKERS:
      return { ...state, all: action.tickers };
    case SET_CURRENT_TICKER_PRICE:
      return { ...state, currentTickerPrice: action.price };
    default:
      return state;
  }
};

export default reducer;
