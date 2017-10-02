import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect }          from 'react-redux';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import * as actions         from '../../../actions/bookings';
import './Booking.css';

const BookingField = ({ input, label, children,  meta: { error, touched } }) => {
  return (
    <SelectField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    children={children}
    />
  )
}

class BookingForm extends Component {
  renderField(){
    const { nearby } = this.props;
    return(
      <Field
          name="stretchologist"
          component={BookingField}
          label="select stretchologist"
        >

        {
          nearby.map(item => {
            const { _id , profile, stretchologistId } = item.obj
            return <MenuItem  key={_id} value={stretchologistId} primaryText={profile.firstname} />
          })
        }
        </Field>
    )
  }

  render(){
    const { onBookingSubmit, cancelBooking } = this.props;
    return (
      <form className='booking_form flex_me' onSubmit={this.props.handleSubmit(onBookingSubmit) }>
        <div>{ this.renderField() }</div>
        <div className='booking_form_buttons flex_me'>
          <button className='booking_form_button review' type='submit'>Review</button>
          <button className='booking_form_button' onClick={()=>cancelBooking()}>Cancel</button>
        </div>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};
  return errors;
}

const mapStateToProps = ({ stretchologists }) => {
  const { nearby } = stretchologists;
  return { nearby };
}

export default connect(mapStateToProps, actions)(reduxForm({
  validate,
  form: 'bookingForm',
  destroyOnUnmount: false
})(BookingForm));
