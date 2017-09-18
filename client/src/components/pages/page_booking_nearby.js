import React from 'react';
import { Link } from 'react-router';

import Map from '../map/MapGoogle';

const BookingNearbyPage = () => {
  return (
    <div>
      <Map />
      <Link to='/'>Back</Link>
    </div>
  );
}

export default BookingNearbyPage;
