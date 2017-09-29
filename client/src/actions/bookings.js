import axios      from 'axios';
import * as types from './types';

export const bookStretchologist = (stretchologistLocations, user) => dispatch => {
  const { googleDisplayName } = user;
  const nearbyStretchologist = stretchologistLocations[Math.floor(Math.random() * stretchologistLocations.length )];

  axios.post(`/api/bookings`, { nearbyStretchologist, googleDisplayName } )
    .then( res => {
      console.log('success');
    })
    .catch(err => {
      console.log(err)
    });
}

export const cancelBookingForm = () => dispatch => {
  dispatch({ type: types.CANCEL_BOOKING });
}

export const createBookingForm = () => dispatch => {
  dispatch({ type: types.CREATE_BOOKING });
}
