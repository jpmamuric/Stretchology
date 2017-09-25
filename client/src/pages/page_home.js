import React          from 'react';
import { connect }    from 'react-redux';

import './pages.css';
import Home from '../components/home/Home';

const HomePage = ({ user }) => {
  return (
    <div className='page_home'>
      {
        user
        ? <Home />
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
