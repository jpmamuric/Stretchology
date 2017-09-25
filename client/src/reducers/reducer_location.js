import * as types from '../actions/types';

const initialState = {
  currentLocation: null,
  geocode: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_GEOLOCATION:
      return { ...state, geocode: action.payload };
    case types.FETCH_CURRENT_LOCATION:
      return { ...state, currentLocation: action.payload };
    default:
      return state;
  }
}
