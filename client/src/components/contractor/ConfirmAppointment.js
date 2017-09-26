import React    from 'react';
import socketio from "socket.io-client";
import { connect } from 'react-redux';

import * as actions from '../../actions/stretchologist';

class ConfirmAppointment extends React.Component {
  state = { endpoint: 'http://localhost:3000'}

  componentDidMount(){
    const { endpoint } = this.state;
    const socket = socketio(endpoint);
    socket.on('connect', () => {

      const currentData = {
        "socketId": socket.id,
        "stretchologistId": this.props._id
      }

      this.props.updateSocketId(currentData);

    });
  }

  render(){
    return (
      <div>
        Confirmation Test
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  const { _id } = auth.user;
  return { _id };
}

export default connect(mapStateToProps, actions)(ConfirmAppointment)
