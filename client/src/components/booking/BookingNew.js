import React, { Component } from 'react';
import { reduxForm }        from 'redux-form';

import BookingForm          from './BookingForm';
import BookingReview        from './BookingReview';


class NewBooking extends Component {
  state = { showReview: false };

  renderBooking(){
    if (this.state.showReview) {
      return <BookingReview
        onBack={ ()=>this.setState({ showReview: false })}
      />
    }
    return <BookingForm
      onBookingSubmit={ ()=>this.setState({ showReview: true })}
     />
  }

  render(){
    return <div>{this.renderBooking()}</div>
  }
}

export default reduxForm({
  form: 'bookingForm'
})(NewBooking);
