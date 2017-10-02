import * as types from '../actions/types';

const initialState = {
  status: false,
  socketId: null,
  nearby: null,
  notification: null,
  requests: null || false,
  message: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_SOCKET_ID:
      return { ...state, socketId: action.payload };
    case types.STRETCHOLOGIST_STATUS_ACTIVE:
      return { ...state, status: true };
    case types.STRETCHOLOGIST_STATUS_INACTIVE:
      return { ...state, status: false };
    case types.FETCH_NEARBY_STRETCHOLOGISTS:
      return { ...state, nearby: action.payload };
    case types.FETCH_NEARBY_NOTIFICATION:
      return { ...state, notification: action.payload };
    case types.FETCH_NEARBY_REQUESTS:
      return { ...state, requests: action.payload };
    case types.UNFETCH_NEARBY_REQUESTS:
      return { ...state, requests: false };
    case types.NEARBY_REQUESTS_FAIL:
      return { ...state, message: action.payload };
    default:
      return state;
  }
}
