/* global google */
import React, { Component } from 'react';
import { connect }          from 'react-redux';

import * as actions   from '../../../actions/stretchologist';
import BookingButton  from '../booking/BookingButton';
import BookingPending from '../booking/BookingPending';
import markerImg      from '../../../images/marker.png';
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
    this.renderSearchbox(map)
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

  renderButton(){
    if(!this.props.nearby) {
      return null;
    } else {
      return <BookingButton />
    }
  }

  renderSearchbox(map){
    if(!map) {
      return null;
    }

    let searchbox = document.getElementById('searchbox');

    let autocomplete = new google.maps.places.Autocomplete(searchbox, {
      componentRestrictions: { country: 'us' }
    });

    autocomplete.bindTo('bounds', map);
    autocomplete.addListener('place_changed', () => {
      let place = autocomplete.getPlace();
      if (!place.geometry) {
        return;
      }
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        return;
      }


      console.log(place.geometry.location)
    });

  }

  render(){
    const { isPending } = this.props;
    return (
      <div>
        <div ref='map' id='map'/>
        <div className='searchbox_container flex_me'>
          <input id='searchbox' ref='input' className='searchbox_input'/>
        </div>
        { isPending ? <BookingPending /> : null }
        { this.renderMarkers()}
        { this.renderButton() }
      </div>
    )
  }
}

const mapStateToProps = ({ location, stretchologists, bookings }) => {
  const { currentLocation } = location;
  const { nearby } = stretchologists;
  const { isPending } = bookings;
  return { currentLocation , nearby, isPending };
}

export default connect(mapStateToProps, actions)(MapContainer);
