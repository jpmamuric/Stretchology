import axios from 'axios';
import { browserHistory } from 'react-router';
import * as types from './types'

export const findGeolocation = ({ cityName }) => dispatch => {
  axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
    params: {
      address: cityName,
      key: 'AIzaSyAXD6aRw2EBOv_8psZHptYP6YDt8mix1B8'
    }
  })
  .then(res => {
    dispatch({ type: types.FETCH_GEOLOCATION, payload: res.data.results });
    dispatch({ type: types.FETCH_GEOLOCATION_SUCCESS });
    dispatch({ type: types.RESET_CONTRACTOR_LIST });
    browserHistory.push('/');
  })
  .catch(err => dispatch({ type: types.FETCH_GEOLOCATION, payload: err }));
}

export const findContractorsNearby = ({ coordinates }) => dispatch => {
  const { lat, lng } = coordinates;
  axios.get(`/api/contractors?lng=${lng}&lat=${lat}`)
    .then(res => {
      dispatch({ type: types.FETCH_NEARBY_CONTRACTORS, payload: res.data })
    })
    .catch(err => console.log(err));
}

export const resetContractorList = () => dispatch => {
  dispatch({ type: types.RESET_CONTRACTOR_LIST });
}
