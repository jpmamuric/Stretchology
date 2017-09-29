import React          from 'react';
import { connect }    from 'react-redux';

import * as actions from '../../../actions/bookings';
import formFields   from './form_fields';

const BookingFormReview = ({
  user,
  socketId,
  nearby,
  onCancelReview,
  values,
  bookStretchologist,
  history
}) => {
  const reviewFields = formFields.map((field,i) => {
    return (
      <div key={i}>
        <label>{field.label}</label>
        <div>{values[field.name]}</div>
      </div>
    );
  });

  return (
    <div >
      <h5>Please confirm your entries</h5>
      {reviewFields}
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
