import * as types from '../actions/types';

const initialState = {
  isBooking: false,
  isPending: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.CANCEL_BOOKING:
      return { ...state, isBooking: false, isPending: false };
    case types.CREATE_BOOKING:
      return { ...state, isBooking: true };
    case types.PENDING_BOOKING:
      return { ...state, isPending: true };
    case types.PENDING_CONFIRMED_BOOKING:
      return { ...state, isPending: false };
    default:
      return state;
  }
}
