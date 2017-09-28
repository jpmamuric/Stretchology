import React, { Component } from 'react';
import { connect } from 'react-redux'

import * as actions from '../../actions/stretchologist';
import './Contractor.css';

class Contractor extends Component {
  componentDidMount(){
    const { socketId, user } = this.props;
    const { _id } = user;
      const currentData = {
        "socketId": socketId,
        "stretchologistId": _id
      }

      this.props.updateSocketId(currentData);
      this.props.fetchRequestList(_id)
    // api GET request to server
      // dispatch bookings list
  }

  render(){
    const { googleDisplayName } = this.props.user;
    return (
      <div>
        <h1>{ googleDisplayName }</h1>
        <div>Contractor Dashboard</div>
      </div>
    )
  }
}

const mapStateToProps = ({ auth, stretchologists }) => {
  const { user } = auth;
  const { socketId, requests } = stretchologists;
  return { user, socketId, requests };
}

export default connect(mapStateToProps, actions)(Contractor);
