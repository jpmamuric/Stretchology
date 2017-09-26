import axios      from 'axios';
import * as types from './types';

export const getSocketId = (id) => dispatch => {
  dispatch({ type: types.FETCH_SOCKET_ID, payload: id });
};

export const updateSocketId = ({ socketId, stretchologistId }) => dispatch => {
  axios.put(`/api/stretchologists_locations/${stretchologistId}`, {socketId} )
    .then( res => {
      console.log('success');
      dispatch({ type: types.UPDATE_SOCKET_ID, payload: res.data });
    })
    .catch(err => {
      console.log(err)
    });
}
