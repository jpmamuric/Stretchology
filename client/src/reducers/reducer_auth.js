import * as types from '../actions/types';

const initialState = {
  authenticated: false,
  user: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_USER:
      return { ...state, user: action.payload || false };
    case types.USER_AUTHENTICATED:
      return { ...state };
    default:
      return state;
  }
}
