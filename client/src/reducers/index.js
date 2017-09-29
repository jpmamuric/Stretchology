import { combineReducers } from 'redux';

import { reducer as form } from 'redux-form';
import auth                from './reducer_auth';
import location            from './reducer_location';
import bookings            from './reducer_booking';
import stretchologists     from './reducer_stretchologists';

const rootReducer = combineReducers({
  form,
  auth,
  location,
  bookings,
  stretchologists
});

export default rootReducer;
