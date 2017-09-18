import React, { Component } from 'react'
import StripeCheckout       from 'react-stripe-checkout';
import { connect }          from 'react-redux';

import * as actions         from '../../actions/payments';
import '../nav/Nav.css'

class StripePayments extends Component {
  render(){
    const { handleStripeToken } = this.props
    return (
      <StripeCheckout
          name='Stretchology'
          amount={2500}
          token={token => handleStripeToken(token)}
          stripeKey={process.env.REACT_APP_STRIPE_KEY}
        >
        <div className='sidebar_link'>Add Credits</div>
        </StripeCheckout>
    );
  }
}

export default connect(null, actions)(StripePayments);
