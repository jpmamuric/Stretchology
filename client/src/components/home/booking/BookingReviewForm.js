import React          from 'react';
import { connect }    from 'react-redux';

import * as actions from '../../../actions/bookings';
import './Booking.css'

const BookingFormReview = ({
  user,
  values,
  searchboxLocation,
  bookStretchologist,
  onCancelReview,
  history
}) => {
  const { stretchologist } = values;
  const { firstname, lastname } = stretchologist.profile;
  return (
    <div className='booking_form flex_me'>
      <div>Please confirm your entries:</div>
      { searchboxLocation ? <div>{ searchboxLocation }</div> : null }
      <div> stretchologist: { `${firstname} ${lastname}` }</div>
      <div className='booking_form_buttons flex_me'>
        <button className='booking_form_button review' onClick={()=>bookStretchologist(stretchologist, searchboxLocation, user)}>Book</button>
        <button className='booking_form_button ' onClick={onCancelReview} >Back</button>
      </div>
    </div>
  )
};

const mapStateToProps = ({ form, auth, location }) => {
  const { values } = form.bookingForm;
  const { user } = auth;
  const { searchboxLocation } = location;
  return { values, user, searchboxLocation };
}

export default connect(mapStateToProps, actions)(BookingFormReview);

// REACT ROUTER 4 ()=>bookStretchologist(values, history)
