import axios from 'axios';
import { browserHistory } from 'react-router';
import * as types from './types'

export const cityNameInputChange  = text => ({ type: types.CITY_NAME_INPUT_CHANGE, payload: text });

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
    browserHistory.push('/booking');
  })
  .catch(err => dispatch({ type: types.FETCH_GEOLOCATION, payload: err }));

}
