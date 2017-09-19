/* global google */
import React, { Component } from 'react';
import { connect }          from 'react-redux';
import { Link } from 'react-router';

import * as actions from '../../actions/contractors';
import '../../index.css';
import arrow from '../../images/back.png'

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/social/group';

class Google_Map extends Component {
  componentDidMount(){
    console.log('---componentDidMount---')
    console.log(this.props)
    if (!this.props.geocode) {
      return null;
    } else {
      const { formatted_address, geometry } = this.props.geocode[0];
      const { lat, lng } = geometry.location;
      const map = new google.maps.Map( this.refs.map, {
        zoom: 14,
        center: { lat, lng },
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        zoomControl: false
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
    } else {
      const { findContractorsNearby } = this.props;
      const { location } = this.props.geocode[0].geometry;
      return (
        <div >
          <div ref='map' id="map" />

          <div style={{ width: '100%'}}>
            <button
              className='btn_stretchologist box_shadow'
              onClick={coordinates=>findContractorsNearby({ coordinates:location })}>
              <Link to='/'>
                <img src={arrow}/>
              </Link>
              Find Stretchologist
            </button>
          </div>

          <FloatingActionButton className='btn_stretchologist_list'>
            <ContentAdd />
          </FloatingActionButton>
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

export default connect(mapStateToProps, actions)(Google_Map);
