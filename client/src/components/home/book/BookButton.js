import React from 'react';
import { connect } from 'react-redux'

import * as actions from '../../../actions/stretchologist';
import './BookButton.css';

const BookingButton = ({ bookStretchologist, nearby }) => {
  const handleOnClick = () => bookStretchologist(nearby);
  return (
    <div className='btn_book flex_me' onClick={handleOnClick}>
      Book
    </div>
  )
}

const mapStateToProps = ({ stretchologists }) => {
  const { nearby } = stretchologists
  return { nearby };
}

export default connect(mapStateToProps, actions)(BookingButton);
