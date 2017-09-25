/* global google */
import React, { Component } from 'react';
import { connect }          from 'react-redux';

import * as actions from '../../../actions/contractors';
import './Map.css';

class MapContainer extends Component {
  componentDidMount(){
    this.props.getCurrentLocation();
  }

  renderMap(){
    if(!this.props.currentLocation) {
      return <div>loading...</div>
    }
    const { latitude, longitude } = this.props.currentLocation.coords;

    var latlng = new google.maps.LatLng(latitude, longitude);
    var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 13,
          center: latlng
        });
  }

  render(){
    return <div>
      {this.renderMap()}
      <div id='map'/>
    </div>
  }
}

const mapStateToProps = ({ location }) => {
  const { currentLocation } = location;
  return { currentLocation };
}

export default connect(mapStateToProps, actions)(MapContainer);
