import axios      from 'axios';
import * as types from './types';

/********************
CONTRACTOR
*********************/
export const updateSocketId = ({ socketId, stretchologistId }) => dispatch => {
  axios.put(`/api/stretchologists_locations/${stretchologistId}`, {socketId} )
    .then( res => {
      console.log('success');

      //save to local storage
      localStorage.setItem('socketId', socketId);

      // dispatch({ type: types.UPDATE_SOCKET_ID, payload: res.data });
    })
    .catch(err => {
      console.log(err)
    });
}

export const fetchRequestList = (stretchologistId) => dispatch => {
  axios.get(`/api/bookings/${stretchologistId}`)
    .then( res => {
      dispatch({ type: types.FETCH_NEARBY_REQUESTS, payload: res.data });
    })
    .catch(err => {
      console.log(err)
    });
}

export const unfetchRequestList = () => dispatch => {
  dispatch({ type: types.UNFETCH_NEARBY_REQUESTS });
}

export const activateStretchologist = () => dispatch => {
  dispatch({ type: types.STRETCHOLOGIST_STATUS_ACTIVE });
}

export const unActivateStretchologist = () => dispatch => {
  localStorage.removeItem('socketId');
  dispatch({ type: types.STRETCHOLOGIST_STATUS_INACTIVE });
}

/********************
CLIENT
*********************/
export const findStretchologistNearby = ({ latitude, longitude }) => dispatch => {
  axios.get(`/api/stretchologists_nearby?lng=${longitude}&lat=${latitude}`)
    .then(res => {
      dispatch({ type: types.FETCH_NEARBY_STRETCHOLOGISTS, payload: res.data })
    })
    .catch(err => console.log(err));
}

export const fetchSearchboxLocation = (address) => dispatch => {
  dispatch({ type: types.FETCH_SEARCHBOX_LOCATION, payload: address });
}
