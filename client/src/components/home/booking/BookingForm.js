import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect }          from 'react-redux';

import * as actions         from '../../../actions/bookings';
import formFields           from './form_fields';
import './Booking.css';

const BookingField = ({ input, label, meta: { error, touched } }) => {
  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{ marginBottom: 5 }} placeholder={ error }/>

    </div>
  )
}

const FIELDS = formFields;

class BookingForm extends Component {
  renderFields(){
    return FIELDS.map((field, i) => {
      return <Field
        type='text'
        key={i}
        name={field.name}
        label={field.label}
        component={BookingField}
      />
    });
  }

  render(){
    const { onBookingSubmit, cancelBooking } = this.props;
    return (
      <form className='booking_form' onSubmit={this.props.handleSubmit(onBookingSubmit) }>
        { this.renderFields() }
        <button className='' onClick={()=>cancelBooking()}>Cancel</button>
        <button type='submit' className=''>Review</button>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  FIELDS.forEach( ({ name, noValueError }) => {
    if(!values[name]) {
      errors[name] = noValueError
    };
  });

  return errors;
}

export default connect(null, actions)(reduxForm({
  validate,
  form: 'bookingForm',
  destroyOnUnmount: false
})(BookingForm));
