import React, { Component } from 'react'
import { connect }          from 'react-redux';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

import * as actions from '../../actions/contractors';
import '../../index.css';
import './Map.css';

import BookingForm2    from '../booking/BookingForm2';

class LeafletMap extends Component {
  renderStretchologistBtn(){
    if(!this.props.geocode){
      return null;
    }
    else {
      const { findContractorsNearby } = this.props;
      const { location } = this.props.geocode[0].geometry;
      return (
        <button
          className='btn_stretchologist box_shadow'
          onClick={coordinates=>findContractorsNearby({ coordinates:location })}>
          Find Stretchologist
        </button>
      );
    }
  }

  renderMarkers(){
    const { lat, lng } = this.props.geocode[0].geometry.location
    const { list } = this.props;
    const position = [lat, lng];
    if(!list) {
      return (
        <Marker position={position}>
          <Popup>
            <span>My Location<br/>point details.</span>
          </Popup>
        </Marker>
      )
    } else {
      console.log(list);
      console.log(list.map(item=>item.obj.geometry.coordinates))
      return (
        <Marker position={position}>
          <Popup>
            <span>My Location<br/>point details.</span>
          </Popup>
        </Marker>
      )
    }

  }

  render(){
    if( !this.props.geocode ) {
      const position = [34.1427021, -118.1412151];
      return (
        <div>
          <BookingForm2 />
          <Map center={position} zoom={14} className='leaflet_map' >
            <TileLayer
              url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
              <Popup>
                <span>Homebase<br/>Original Stretchology</span>
              </Popup>
            </Marker>
          </Map>
        </div>
      );
    } else {
      const { lat, lng } = this.props.geocode[0].geometry.location
      const position = [lat, lng];
      return (
        <div>
          <BookingForm2 />
          <Map center={position} zoom={13} className='leaflet_map' >
            <TileLayer
              url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
          { this.renderMarkers()}

          </Map>
          {this.renderStretchologistBtn()}
        </div>
      );
    }

  }
}


const mapStateToProps = ({ location, contractors }) => {
  const { geocode } = location;
  const { list } = contractors;
  return { geocode, list };
}

export default connect(mapStateToProps, actions)(LeafletMap);
