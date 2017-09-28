import React          from 'react';
import { connect }    from 'react-redux';

import './pages.css';
import Dashboard from '../components/dashboard/Dashboard';

const HomePage = ({ user }) => {
  return (
    <div className='page_home'>
      {
        user
        ? <Dashboard />
        : <h1>must be sign in</h1>
      }
    </div>
  )
}

const mapStateToProps = ({ auth }) => {
  const { user } = auth;
  return { user };
}

export default connect(mapStateToProps)(HomePage);
