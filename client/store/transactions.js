import axios from 'axios';
import { updateBalance } from './user';

// Constants
const SET_TRANSACTIONS = 'SET_TRANSACTIONS';
const ADD_TRANSACTION = 'ADD_TRANSACTION';
const SET_ERROR = 'SET_ERROR';

// Actions
const setTransactions = transactions => ({
  type: SET_TRANSACTIONS,
  transactions,
});

const addTransaction = transaction => ({
  type: ADD_TRANSACTION,
  transaction,
});

const setError = err => ({
  type: SET_ERROR,
  err,
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

export const buyStock = stock => async (dispatch, getState) => {
  try {
    const { user } = getState();
    const { data } = await axios.post(
      `/api/user/${user.id}/transactions`,
      stock
    );
    console.log(user.balance, data);
    const balance = user.balance - data.price * data.shares;
    dispatch(updateBalance(balance));
    dispatch(addTransaction(data));
  } catch (err) {
    console.error(err);
  }
};

// Reducer
const defaultState = {
  all: [],
  error: null,
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_TRANSACTIONS:
      return { ...state, all: action.transactions };
    case ADD_TRANSACTION:
      return {
        ...state,
        all: [...state.all, action.transaction],
      };
    case SET_ERROR:
      return {
        all: [],
        error: action.err,
      };
    default:
      return state;
  }
};

export default reducer;
