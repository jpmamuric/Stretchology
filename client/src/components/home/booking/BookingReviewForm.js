import React          from 'react';
import { connect }    from 'react-redux';

import * as actions from '../../../actions/bookings';

const BookingFormReview = ({
  user,
  socketId,
  nearby,
  onCancelReview,
  values,
  bookStretchologist,
  history
}) => {

  return (
    <div >
      <h5>Please confirm your entries</h5>
      <button
        className=''
        onClick={onCancelReview}>
        Back
      </button>
      <button
        className=''
        onClick={()=>bookStretchologist(nearby,user)}>
        Book
      </button>
    </div>
  )
};

const mapStateToProps = ({ form, stretchologists, auth }) => {
  const { values } = form.bookingForm;
  const { socketId, nearby } = stretchologists;
  const { user } = auth;
  return { values, socketId, user, nearby };
}

export default connect(mapStateToProps, actions)(BookingFormReview);

// ()=>bookStretchologist(values, history)
