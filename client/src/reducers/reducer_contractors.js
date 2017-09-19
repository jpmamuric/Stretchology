import * as types from '../actions/types';

const initialState = {
  list: null,
  errMessage: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_NEARBY_CONTRACTORS:
      return { ...state, list: action.payload  };
    case types.FETCH_NEARBY_ERROR:
      return { ...state, errMessage: 'no stretchologist near you' };
    case types.RESET_CONTRACTOR_LIST:
      return { ...state, list: null };
    default:
      return state;
  }
}
