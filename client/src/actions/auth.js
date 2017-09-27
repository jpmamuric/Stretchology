import axios from 'axios';
import * as types from './types'

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: types.FETCH_USER, payload: res.data });
};


export const getCurrentLocation = () => dispatch => {
  const getPosition = function (options) {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }

  getPosition()
    .then((position) => {
      console.log(position)
        dispatch({ type: types.FETCH_CURRENT_LOCATION, payload: position });
    })
    .catch((err) => {
      console.error(err.message);
    });
}

export const fetchSocketId = () => dispatch => {
  dispatch({ type: 'server/socketId' });
}
