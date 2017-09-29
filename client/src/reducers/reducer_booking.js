import * as types from '../actions/types';

const initialState = {
  isBooking: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.CANCEL_BOOKING:
      return { ...state, isBooking: false };
    case types.CREATE_BOOKING:
      return { ...state, isBooking: true };
    default:
      return state;
  }
}
