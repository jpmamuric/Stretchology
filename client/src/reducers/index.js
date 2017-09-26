import { combineReducers } from 'redux';

import { reducer as form } from 'redux-form';
import auth                from './reducer_auth';
import location            from './reducer_location';
import contractors         from './reducer_contractors';
import stretchologists     from './reducer_stretchologists';

const rootReducer = combineReducers({
  form,
  auth,
  location,
  contractors,
  stretchologists
});

export default rootReducer;
