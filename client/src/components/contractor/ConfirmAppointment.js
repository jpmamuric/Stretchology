import React, { Component }   from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions/stretchologist';
import ContractorItem from './ContractorItem';


class ConfirmAppointment extends Component {
  renderRequestItems(){
    const { requests } = this.props;
    if( requests.length === 0 ) {
      return <div> no available requests :(  </div>;
    }

    return requests.map(request => {
      const { _id } = request;
      return <ContractorItem key={_id} {...request}/>
    });
  }

  renderRequestList(){
    const { requests } = this.props;

    switch (requests) {
      case null:
        return <div>loading...</div>;
      case false:
        return <div> Lets get started! please activate now</div>;
      default:
        return (
          <div className='card_container box_shadow'>
            { this.renderRequestItems() }
          </div>
        )
    }
  }

  render(){
    return (
      <div className='flex_me appointment_container'>

        {/* send notification to contractor */}

        {
          this.props.notification
          ? <div> NEW! request from: {this.props.notification.googleDisplayName}</div>
          : null
        }

        { this.renderRequestList() }

      </div>
    )
  }
}

const mapStateToProps = ({ stretchologists }) => {
  const { requests, notification } = stretchologists;
  return { requests, notification };
}

export default connect(mapStateToProps, actions)(ConfirmAppointment)
