/* global google */
import React, { Component } from 'react';
import { connect }          from 'react-redux';

import * as actions from '../../../actions/contractors';
import SearchBox    from '../searchbox/SearchBox';
import './Map.css';

class MapContainer extends Component {
  componentDidMount(){
    this.renderMap()
  }

  renderMap(){
    const { latitude, longitude } = this.props.currentLocation.coords;
    const latlng = new google.maps.LatLng(latitude, longitude);

    new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: latlng,
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
      zoomControl: false
    });

    this.props.findContractorsNearby({ latitude, longitude })
  }

  render(){
    return (
      <div>
        <div id='map'/>
        <SearchBox />
      </div>
    )
  }
}

const mapStateToProps = ({ location }) => {
  const { currentLocation } = location;
  return { currentLocation };
}

export default connect(mapStateToProps, actions)(MapContainer);
