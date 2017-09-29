import React from "react"
import { connect } from 'react-redux'

import * as actions from '../../../actions/bookings';
import LoadingImg   from '../../../images/stitch.gif';
import './Booking.css';

const BookingPending = ({ cancelBooking}) => {
  return (
      <div className='booking_pending_container flex_me'>
        <img src={LoadingImg} alt='stitch' className='booking_pending_img'/>
        <div> Finding you a stretchologist </div>
        <div className='booking_pending_btn' onClick={()=>cancelBooking()}> Cancel </div>
      </div>
    )
}

export default connect(null, actions)(BookingPending);
