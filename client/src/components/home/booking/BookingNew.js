import React, { Component } from 'react';
import { reduxForm }        from 'redux-form';

import BookingForm           from './BookingForm';
import BookingReviewForm     from './BookingReviewForm';
import './Booking.css'

class BookingNew extends Component {
  state = { showReviewForm: false };

  renderForm(){
    if (this.state.showReviewForm ) {
      return <BookingReviewForm
        onCancelReview={()=>this.setState({ showReviewForm: false })}
      />
    }
    return <BookingForm
      onBookingSubmit={()=> this.setState({ showReviewForm : true })}
    />
  }

  render(){
    return <div className='new_form_container box_shadow'>{this.renderForm()}</div>
  }
}

export default reduxForm({
  form: 'bookingForm'
})(BookingNew);
