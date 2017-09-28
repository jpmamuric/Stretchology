import * as types from '../actions/types';

const initialState = {
  socketId: null,
  nearby: null,
  requests: null,
  message: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_SOCKET_ID:
      return { ...state, socketId: action.payload  };
    case types.FETCH_SOCKET_ID:
      return { ...state, socketId: action.payload };
    case types.FETCH_NEARBY_STRETCHOLOGISTS:
      return { ...state, nearby: action.payload };
    case types.FETCH_NEARBY_REQUESTS:
      return { ...state, requests: action.payload };
    case types.NEARBY_REQUESTS_FAIL:
      return { ...state, message: action.payload };
    default:
      return state;
  }
}
