import axios      from 'axios';
import * as types from './types';
import { browserHistory } from 'react-router';

export const bookStretchologist = (stretchologist, user) => dispatch => {
  console.log(stretchologist, user)
  const { googleDisplayName } = user;

  // randomize booking selections
  // const nearbyStretchologist = stretchologistLocations[Math.floor(Math.random() * stretchologistLocations.length )];


  axios.post(`/api/bookings`, { stretchologist, googleDisplayName } )
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
