// Constants
const SET_IS_FETCHING = 'SET_IS_FETCHING';

// Actions
export const fetching = isFetching => ({
  type: SET_IS_FETCHING,
  isFetching,
});

// Reducer
const reducer = (state = false, action) => {
  switch (action.type) {
    case SET_IS_FETCHING:
      return action.isFetching;
    default:
      return state;
  }
};

export default reducer;
