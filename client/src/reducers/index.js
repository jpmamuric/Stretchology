import { combineReducers } from 'redux';

import { reducer as form } from 'redux-form';
import auth                from './reducer_auth';
import location            from './reducer_location';
import contractors         from './reducer_contractors';

const rootReducer = combineReducers({
  form,
  auth,
  location,
  contractors
});

export default rootReducer;
