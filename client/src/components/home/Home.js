import React from 'react';
import { connect } from 'react-redux'

const Home = ({ user }) => {
  const { googleDisplayName } = user;
  return (
    <div>
       <h1>{ googleDisplayName }</h1>
       <div>Client Dashboard</div>
    </div>
  )
}

const mapStateToProps = ({ auth }) => {
  const { user } = auth;
  return { user };
}

export default connect(mapStateToProps)(Home);
