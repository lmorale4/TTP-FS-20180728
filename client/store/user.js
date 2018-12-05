import axios from 'axios';
import { getTransactions, getCurrPrices } from './transactions';
import { requestInInterval } from '../../utils';

// Constants
const SET_USER = 'SET_USER';
const UPDATE_BALACE = 'UPDATE_BALACE';
const REMOVE_USER = 'REMOVE_USER';

// Actions
const setUser = user => ({
  type: SET_USER,
  user,
});

export const updateBalance = balance => ({
  type: UPDATE_BALACE,
  balance,
});

export const removeUser = () => ({
  type: REMOVE_USER,
});

// Thunks
export const auth = (user, history, method) => async dispatch => {
  let res;
  try {
    res = await axios.post(`/auth/${method}`, user);
  } catch (err) {
    dispatch(setUser({ error: err }));
  }

  try {
    await dispatch(setUser(res.data));
    await dispatch(getTransactions());
    history.push('/portfolio');
  } catch (err) {
    console.error(err);
  }
};

// Reducer
const defaultState = {};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_USER:
      return action.user;
    case UPDATE_BALACE:
      return { ...state, balance: action.balance };
    case REMOVE_USER:
      return {};
    default:
      return state;
  }
};

export default reducer;
