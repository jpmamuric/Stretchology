import React from 'react';
import { connect } from 'react-redux'

import * as actions from '../../../actions/bookings';
import BookingNew   from './BookingNew';
import './Booking.css';

const BookingButton = ({ createBookingForm, isBooking }) => {
  return (
    <div>
      {
        isBooking
        ? <BookingNew />
        : <div className='btn_book flex_me' onClick={()=>createBookingForm()}>Book</div>
      }
    </div>
  )

}
const mapStateToProps = ({ bookings }) => {
  const { isBooking } = bookings;
  return { isBooking };
}

export default connect(mapStateToProps, actions)(BookingButton);
