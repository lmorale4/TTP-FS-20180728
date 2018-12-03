import axios from 'axios';

// Constants
const SET_USER = 'SET_USER';
const REMOVE_USER = 'REMOVE_USER';

// Actions
const setUser = user => ({
  type: SET_USER,
  user,
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
    dispatch(setUser(res.data));
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
    case REMOVE_USER:
      return {};
    default:
      return state;
  }
};

export default reducer;
