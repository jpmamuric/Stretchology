import React, { Component } from 'react';
import { connect } from 'react-redux'

import * as actions from '../../actions/stretchologist';
import ConfirmAppointment from './ConfirmAppointment';
import './Contractor.css';

class Contractor extends Component {
  componentDidMount(){
    const { status, user, fetchRequestList, unfetchRequestList} = this.props;
    if (status) {
      fetchRequestList(user._id)
    }
  }

  handleOnClick() {
    const {
      socketId,
      user,
      unfetchRequestList,
      fetchRequestList,
      updateSocketId,
      status,
      activateStretchologist,
      unActivateStretchologist
    } = this.props;

    const { _id } = user;
    const currentData = {
      "socketId": socketId,
      "stretchologistId": _id
    }

    if(!status) {
      activateStretchologist()
      updateSocketId(currentData);
      fetchRequestList(_id)
    } else {
      unActivateStretchologist()
      unfetchRequestList()
    }
  }

  unfetchList(){

  }

  render(){
    const { googleDisplayName } = this.props.user;
    const { status} = this.props;

    return (
      <div>
        <h1>{ googleDisplayName }</h1>
        <div>Contractor Dashboard</div>
        { status ? <button onClick={()=>this.handleOnClick()}>unactivate</button> : <button onClick={()=>this.handleOnClick()}>activate</button> }
        <ConfirmAppointment />
      </div>
    )
  }
}

const mapStateToProps = ({ auth, stretchologists }) => {
  const { user } = auth;
  const { socketId, requests, status } = stretchologists;
  return { user, socketId, requests, status };
}

export default connect(mapStateToProps, actions)(Contractor);
