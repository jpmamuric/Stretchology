import axios      from 'axios';
import * as types from './types';
import { browserHistory } from 'react-router';

export const bookStretchologist = (stretchologistLocations, user) => dispatch => {
  console.log(stretchologistLocations, user)
  const { googleDisplayName } = user;
  const nearbyStretchologist = stretchologistLocations[Math.floor(Math.random() * stretchologistLocations.length )];


  axios.post(`/api/bookings`, { nearbyStretchologist, googleDisplayName } )
    .then( res => {
      console.log('success');
      dispatch({ type: types.PENDING_BOOKING });
    })
    .catch(err => {
      console.log(err)
    });
}


export const cancelBooking = () => dispatch => {
  dispatch({ type: types.CANCEL_BOOKING });
  browserHistory.push('/bookings')
}

export const createBookingForm = () => dispatch => {
  dispatch({ type: types.CREATE_BOOKING });
}
