import React from 'react';
import { Link } from 'react-router';

import '../../index.css';
import Map from '../map/MapGoogle';

const BookingNearbyPage = () => {
  return (
    <div id='map_container'>
      <Map />
      <Link to='/'>refresh</Link>
    </div>
  );
}

export default BookingNearbyPage;
