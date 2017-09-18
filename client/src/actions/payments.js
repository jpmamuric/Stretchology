import axios      from 'axios';
import * as types from './types';

export const handleStripeToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token );
  dispatch({ type: types.FETCH_USER, payload: res.data });
}
