import axios from 'axios';
import { getTransactions, getCurrPrices } from './transactions';

// Constants
import { REMOVE_USER } from './';
const SET_USER = 'SET_USER';
const UPDATE_BALACE = 'UPDATE_BALACE';

// Actions
import { setError } from './error';
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
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me');
    dispatch(setUser(res.data || {}));
  } catch (err) {
    console.error(err);
  }
};

export const auth = (user, history, method) => async dispatch => {
  let res;
  try {
    res = await axios.post(`/auth/${method}`, user);
  } catch (err) {
    dispatch(setError(err));
  }

  try {
    await dispatch(setUser(res.data));
    console.log('BEFORE GETTING');
    await dispatch(getCurrPrices());
    await dispatch(getTransactions());
    console.log('AFTER GETTING');
    history.push('/portfolio');
  } catch (err) {
    dispatch(setError(err));
  }
};

export const logout = history => async dispatch => {
  try {
    await axios.post('/auth/logout');
    dispatch(removeUser());
    history.push('/login');
  } catch (err) {
    dispatch(setError(err));
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
