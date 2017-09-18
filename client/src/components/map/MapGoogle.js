/* global google */
import React, { Component } from 'react';
import { connect }          from 'react-redux';
// import _                    from 'lodash';

class Google_Map extends Component {
  componentDidMount(){
    if (!this.props.geocode) {
      return null;
    } else {
      const { formatted_address, geometry } = this.props.geocode[0];
      const { lat, lng } = geometry.location;
      const map = new google.maps.Map( this.refs.map, {
        zoom: 13,
        center: {
          lat,
          lng,
        }
      });

      function addmarker(){
        const marker = new google.maps.Marker({
          position: geometry.location,
          map: map,
          animation: google.maps.Animation.DROP
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `<div>${formatted_address}</div>`
        });

        marker.addListener('click', function(){
          infoWindow.open(map, marker);
        });
      }

      addmarker();
    }
  }

  render(){
    if (!this.props.geocode){
      return <div>Loading</div>
    }
    return <div ref='map' id="map" className="map"  />;
  }
}

const mapStateToProps = ({ location }) => {
  const { geocode } = location;
  return { geocode };
}

export default connect(mapStateToProps)(Google_Map);
