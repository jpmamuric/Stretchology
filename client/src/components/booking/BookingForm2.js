import React, { Component } from 'react';
import { connect }          from 'react-redux';

import * as actions          from '../../actions/contractors';

import './Booking.css';

class BookingForm2 extends Component {
  handleOnSubmit(e){
    const { cityName } = this.props;
    e.preventDefault();
    if(cityName === '') {
      return null;
    } else {
      this.props.findGeolocation({ cityName });
    }
  }

  render(){
    const { cityNameInputChange, cityName } = this.props;
    return (
      <form onSubmit={e=>this.handleOnSubmit(e)} autoComplete={cityName} >
        <div className='booking_container flex_me'>
          <input
            type='text'
            value={cityName}
            placeholder='Enter City'
            onChange={e=>cityNameInputChange(e.target.value.toLowerCase())}/>
          <button type='submit' className='booking_btn_submit'>Search</button>

        </div>
      </form>
    );
  }
}

const mapStateToProps = ({ location }) => {
  const { cityName } = location;
  return { cityName };
}

export default connect(mapStateToProps, actions)(BookingForm2);
