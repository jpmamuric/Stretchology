import * as types from '../actions/types';

const initialState = {
  socketId: null,
  nearby: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_SOCKET_ID:
      return { ...state, socketId: action.payload  };
    case types.FETCH_SOCKET_ID:
      return { ...state, socketId: action.payload };
    case types.FETCH_NEARBY_STRETCHOLOGISTS:
      return { ...state, nearby: action.payload };
    default:
      return state;
  }
}
