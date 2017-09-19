import React from 'react';
import { Link } from 'react-router';

import '../../index.css';
import Map from '../map/MapGoogle';
import LeafletMap from '../map/Leaflet';


const BookingNearbyPage = () => {
  return (
    <div id='map_container'>
      <Map />
      <LeafletMap />
      <Link to='/'>Back</Link>
    </div>
  );
}

export default BookingNearbyPage;
