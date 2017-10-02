import * as types from '../actions/types';

const initialState = {
  currentLocation: null,
  searchboxLocation: null || false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_SEARCHBOX_LOCATION:
      return { ...state, searchboxLocation: action.payload };
    case types.FETCH_CURRENT_LOCATION:
      return { ...state, currentLocation: action.payload };
    default:
      return state;
  }
}
