import { combineReducers } from 'redux';

import { reducer as form } from 'redux-form';
import auth                from './reducer_auth';
import location            from './reducer_location';

const rootReducer = combineReducers({
  form,
  auth,
  location
});

export default rootReducer;
