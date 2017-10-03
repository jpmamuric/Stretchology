import * as types from '../actions/types';

const initialState = {
  isBooking: false,
  isPending: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.CANCEL_BOOKING:
      return { ...state, isBooking: false, isPending: false };
    case types.CREATE_BOOKING:
      return { ...state, isBooking: true };
    case types.SET_PENDING_BOOKING:
      return { ...state, isPending: true };
    case types.SET_CANCEL_PENDING_BOOKING:
      return { ...state, isPending: false, isBooking: false};
    default:
      return state;
  }
}
