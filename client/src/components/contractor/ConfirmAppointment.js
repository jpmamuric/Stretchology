import React    from 'react';

import { connect } from 'react-redux';

import * as actions from '../../actions/stretchologist';

class ConfirmAppointment extends React.Component {
  componentDidMount(){
    const { _id, socketId } = this.props;
      const currentData = {
        "socketId": socketId,
        "stretchologistId": _id
      }

      this.props.updateSocketId(currentData);
  }

  render(){
    return (
      <div>
        Confirmation Test
      </div>
    )
  }
}

const mapStateToProps = ({ auth, stretchologists }) => {
  const { _id } = auth.user;
  const { socketId } = stretchologists;
  return { _id, socketId };
}

export default connect(mapStateToProps, actions)(ConfirmAppointment)
