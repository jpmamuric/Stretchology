import React          from 'react';
import { connect }    from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as actions from '../../../actions/bookings';
import formFields   from './form_fields';

const BookingFormReview = ({ onCancelReview, values, bookStretchologist, history }) => {
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
        onClick={()=>console.log('booking now')}>
        Book
      </button>
    </div>
  )
};

const mapStateToProps = ({ form }) => {
  const { values } = form.bookingForm;
  return { values };
}

export default connect(mapStateToProps, actions)(withRouter(BookingFormReview));

// ()=>bookStretchologist(values, history)
