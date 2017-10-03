import React from "react"
import { connect } from 'react-redux'

import * as actions from '../../../actions/bookings';
import LoadingImg   from '../../../images/stitch.gif';
import './Booking.css';

const BookingPending = ({ cancelBooking, _id}) => {
  return (
      <div className='booking_pending_container flex_me'>
        <img src={LoadingImg} alt='stitch' className='booking_pending_img'/>
        <p> Contacting your stretchologist </p>
        <div className='booking_pending_btn' onClick={()=>cancelBooking(_id)}> Cancel </div>
      </div>
    )
}

const mapStateToProps = ({ auth }) => {
  const { _id } = auth.user;
  return { _id };
}

export default connect(mapStateToProps, actions)(BookingPending);
