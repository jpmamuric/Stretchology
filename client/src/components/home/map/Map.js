/* global google */
import React, { Component } from 'react';
import { connect }          from 'react-redux';

import * as actions from '../../../actions/stretchologist';
import SearchBox    from '../searchbox/SearchBox';
import markerImg    from '../../../images/marker.png';
import './Map.css';

class MapContainer extends Component {
  state = { map: null }

  componentDidMount(){
    this.renderMap();
  }

  renderCenter(){
    const { latitude, longitude } = this.props.currentLocation.coords;
    const latlng = new google.maps.LatLng(latitude, longitude);
    this.props.findStretchologistNearby({latitude, longitude});
    return latlng;
  }

  renderMap(){
    const map = new google.maps.Map(this.refs.map, {
      zoom: 13,
      center: this.renderCenter(),
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
      zoomControl: false
    });

    this.setState({ map })
  }

  renderMarkers(){
    if(!this.props.nearby) {
      return null;
    } else {
      // eslint-disable-next-line
      const position = this.props.nearby.map( marker => {
        const { coordinates } = marker.obj.geometry;

        let position = new google.maps.LatLng(
          parseFloat(coordinates[1]),
          parseFloat(coordinates[0])
        )
        // eslint-disable-next-line
        let markers = new google.maps.Marker({
          position,
          map: this.state.map,
          icon: markerImg
        });
        return position
      });
    }
  }

  render(){
    return (
      <div>
        <div ref='map' id='map'/>
        <SearchBox />
        { this.renderMarkers()}
      </div>
    )
  }
}

const mapStateToProps = ({ location, stretchologists }) => {
  const { currentLocation } = location;
  const { nearby } = stretchologists;
  return { currentLocation , nearby};
}

export default connect(mapStateToProps, actions)(MapContainer);
