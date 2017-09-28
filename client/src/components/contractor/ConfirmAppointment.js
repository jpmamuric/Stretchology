import React       from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions/stretchologist';
import ContractorItem from './ContractorItem';


class ConfirmAppointment extends React.Component {
  renderRequestList(){
    const { requests } = this.props;
    switch (requests) {
      case null:
        return <div>loading...</div>;
      case false:
        return <div> no available requests :( </div>;
      default:
        return (
          <div className='card_container box_shadow'>
            {
              requests.map(request => {
                const { _id } = request;
                return <ContractorItem key={_id} {...request}/>
              })
            }
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
