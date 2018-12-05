import axios from 'axios';

// Constants
import { REMOVE_USER } from './';
const SET_USER = 'SET_USER';
const UPDATE_BALACE = 'UPDATE_BALACE';

// Actions
import { setError } from './error';
import { fetching } from './isFetching';
import { getTransactions, getCurrPrices } from './transactions';
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
    dispatch(fetching(true));
    const { data } = await axios.get('/auth/me');
    dispatch(setUser(data || {}));
    if (data) {
      await dispatch(getCurrPrices());
      await dispatch(getTransactions());
    }
    dispatch(fetching(false));
  } catch (err) {
    dispatch(fetching(false));
    console.error(err);
  }
};

export const auth = (user, history, method) => async dispatch => {
  let res;
  try {
    dispatch(fetching(true));
    res = await axios.post(`/auth/${method}`, user);
    dispatch(fetching(false));
  } catch (err) {
    dispatch(fetching(false));
    dispatch(setError(err));
  }

  try {
    dispatch(fetching(true));
    await dispatch(setUser(res.data));
    await dispatch(getCurrPrices());
    await dispatch(getTransactions());
    dispatch(fetching(false));
    history.push('/portfolio');
  } catch (err) {
    dispatch(fetching(false));
    dispatch(setError(err));
  }
};

export const logout = history => async dispatch => {
  try {
    dispatch(fetching(true));
    await axios.post('/auth/logout');
    dispatch(removeUser());
    dispatch(fetching(false));
    history.push('/login');
  } catch (err) {
    dispatch(fetching(false));
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
