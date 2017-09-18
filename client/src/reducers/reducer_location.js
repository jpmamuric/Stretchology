import * as types from '../actions/types';

const initialState = {
  geocode: null,
  cityName: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_GEOLOCATION:
      return { ...state, geocode: action.payload };
    case types.FETCH_GEOLOCATION_SUCCESS:
      return { ...state, cityName: '' };
    case types.CITY_NAME_INPUT_CHANGE:
      return { ...state, cityName: action.payload };
    default:
      return state;
  }
}
