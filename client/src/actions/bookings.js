import axios      from 'axios';
import * as types from './types';
import { browserHistory } from 'react-router';

export const bookStretchologist = (stretchologist, address, user) => dispatch => {
  console.log(stretchologist, user)
  const { googleDisplayName, _id } = user;

  // randomize booking selections
  // const nearbyStretchologist = stretchologistLocations[Math.floor(Math.random() * stretchologistLocations.length )];
  axios.put(`/api/bookings/book/${_id}`)
    .then( res => console.log('client is booking'))
    .catch((err) => console.log(err));

  axios.post(`/api/bookings`, { stretchologist, googleDisplayName, _id, address } )
    .then( res => {
      console.log('success');
      dispatch({ type: types.SET_PENDING_BOOKING });
    })
    .catch(err => {
      console.log(err)
    });
}

export const cancelBooking = (id) => dispatch => {
  axios.put(`/api/bookings/cancel/${id}`)
    .then( res => {
      console.log('client canceled booking')
      dispatch({ type: types.SET_CANCEL_PENDING_BOOKING })
    })
    .catch((err) => console.log(err));
}

export const createBookingForm = () => dispatch => {
  dispatch({ type: types.CREATE_BOOKING });
}

export const confirmBooking = () => dispatch => {

}
