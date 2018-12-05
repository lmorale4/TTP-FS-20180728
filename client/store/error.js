// Constants
import { SET_ERROR, REMOVE_ERROR } from './';

// Actions
export const setError = error => ({
  type: SET_ERROR,
  error,
});

export const removeError = () => ({
  type: REMOVE_ERROR,
});

// Reducer
const reducer = (state = {}, action) => {
  switch (action.type) {
    case SET_ERROR:
      return action.error;
    case REMOVE_ERROR:
      return {};
    default:
      return state;
  }
};

export default reducer;
