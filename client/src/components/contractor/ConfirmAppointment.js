import React       from 'react';
import { connect } from 'react-redux';

class ConfirmAppointment extends React.Component {
  componentDidMount(){

  }

  render(){
    return (
      <div>
        {/* send notification to contractor */}
        {
          this.props.requests
          ? <div> request from: {this.props.requests.googleDisplayName}</div>
          : <div> No Available Requests </div>
        }
      </div>
    )
  }
}

const mapStateToProps = ({ stretchologists }) => {
  const { requests } = stretchologists;
  return { requests };
}

export default connect(mapStateToProps)(ConfirmAppointment)
