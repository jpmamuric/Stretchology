/* global google */
import React, { Component } from 'react';
import { connect }          from 'react-redux';
import { Link } from 'react-router';

import * as actions from '../../actions/contractors';
import '../../index.css';
import './Map.css';
import arrow from '../../images/back.png'

import Drawer from 'material-ui/Drawer';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/social/group';

class Google_Map extends Component {
  state = { open: false }
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

  handleOnClick(){
    this.setState({open: !this.state.open});
  }

  renderButton() {
    const { list } = this.props;
    if(!list) {
      return null;
    }
    else {
      return (
        <FloatingActionButton
          onClick={()=>this.handleOnClick()}
          className='btn_stretchologist_list'>
          <ContentAdd />
        </FloatingActionButton>
      )
    }
  }

  renderList(){
    const { list } =this.props;
    if(!list || list.length === 0) {
      return <div>no stretchologist in the area</div>
    } else {
      return (
        <div className='contractor_list_container'>
          <div>
            <h3> Nearby </h3>
          </div>
          <div className='flex_me contractor_list'>
            {
              list.map( person => {
                const { email } = person.obj;
                return (
                  <div
                    className='contractor_list_item'
                    key={email}>
                    {email}
                  </div>
                )
              })
            }
          </div>
        </div>
      )
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
              <Link to='/' onClick={()=>this.props.resetContractorList()}>
                <img src={arrow} alt='back arrow'/>
              </Link>
              Find Stretchologist
            </button>
          </div>

          { this.renderButton() }
          <Drawer
            width={250}
            docked={false}
            openSecondary={true}
            onRequestChange={()=>this.handleOnClick()}
            open={this.state.open} >
            { this.renderList() }
          </Drawer>
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
