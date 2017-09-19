import React          from 'react';
import { connect }    from 'react-redux';

import './pages.css';
// import HomeNewMember  from '../home/New_Member.js';
import TestPage       from '../map/Leaflet';
import HomeReturningMember from '../home/Returning_Member.js';


const HomePage = ({ user }) => {
  return (
    <div className='page_home'>
      {
        user
        ? <HomeReturningMember />
        : <TestPage />
      }
    </div>
  )
}

const mapStateToProps = ({ auth }) => {
  const { user } = auth;
  return { user };
}

export default connect(mapStateToProps)(HomePage);
