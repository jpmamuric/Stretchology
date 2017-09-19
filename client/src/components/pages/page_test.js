import React from 'react';
import { Link } from 'react-router';

import './pages.css';
import LeafletMap from '../map/Leaflet';


const TestPage = () => {
  return (
    <div className=''>
      <LeafletMap />
    </div>
  );
}

export default TestPage;
