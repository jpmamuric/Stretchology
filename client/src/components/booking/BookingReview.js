import React , { Component } from 'react';
import _                     from 'lodash';
import { connect }           from 'react-redux';

import * as actions          from '../../actions/contractors';

import Map from '../map/MapGoogle';

class ReviewBooking extends Component {
  render(){
    const { onBack, values, findGeolocation } = this.props;
    const lcValues = _.mapValues(values, _.method('toLowerCase'));
    return (
      <div>
        <button onClick={onBack}>Back</button>
        <button onClick={()=>findGeolocation(lcValues)}>Yes Book Me</button>
      </div>
    )
  }
}

const mapStateToProps = ({ form }) => {
  const { values } = form.bookingForm;
  return { values };
}

export default connect(mapStateToProps, actions)(ReviewBooking);
