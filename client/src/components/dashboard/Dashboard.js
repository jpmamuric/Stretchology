import React from 'react';
import { connect } from 'react-redux'

import Contractor from '../contractor/Contractor';
import Home       from '../home/Home';

const Dashboard = ({ user }) => {
  const { contractor } = user;
  return (
    <div>
      {
        !contractor
        ? <Home />
        : <Contractor />
      }
    </div>
  )
}

const mapStateToProps = ({ auth }) => {
  const { user } = auth;
  return { user };
}

export default connect(mapStateToProps)(Dashboard);
