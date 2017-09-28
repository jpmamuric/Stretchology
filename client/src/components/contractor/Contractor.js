import React from 'react';
import { connect } from 'react-redux'

const Contractor = ({ user }) => {
  const { googleDisplayName } = user;
  return (
    <div>
      <h1>{ googleDisplayName }</h1>
      <div>Contractor Dashboard</div>
    </div>
  )
}

const mapStateToProps = ({ auth }) => {
  const { user } = auth;
  return { user };
}

export default connect(mapStateToProps)(Contractor);
