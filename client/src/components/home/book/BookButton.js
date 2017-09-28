import React from 'react';
import { connect } from 'react-redux'

import * as actions from '../../../actions/stretchologist';
import './BookButton.css';

const BookingButton = ({ bookStretchologist, nearby, user }) => {
  const handleOnClick = () => bookStretchologist(nearby, user);
  return (
    <div className='btn_book flex_me' onClick={handleOnClick}>
      Book
    </div>
  )
}

const mapStateToProps = ({ stretchologists, auth }) => {
  const { nearby } = stretchologists;
  const { user } = auth;
  return { nearby, user };
}

export default connect(mapStateToProps, actions)(BookingButton);
