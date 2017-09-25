import React from 'react';
import { connect } from 'react-redux';
import Map from '../components/home/map/Map'

const BookingPage = ({ currentLocation }) => {
  return (
    <div>
      {
        currentLocation && <Map />
      }
    </div>
  );
}
const mapStateToProps = ({ location }) => {
  const { currentLocation } = location;
  return { currentLocation };
}
export default connect(mapStateToProps)(BookingPage);
