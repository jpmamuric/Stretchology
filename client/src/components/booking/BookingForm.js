import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

import './Booking.css';
import BookingField         from './BookingField';


class BookingForm extends Component {
  render(){
    const { handleSubmit, onBookingSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(onBookingSubmit)}>
        <div className='booking_container flex_me'>
          <Field type='text' name='city' component={BookingField}/>
          <button type='submit' className='booking_btn_submit'>Search</button>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'bookingForm',
  destroyOnUnmount: false
})(BookingForm);
