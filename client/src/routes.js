import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';

// Pages
import HomePage               from './pages/page_home';
import SigninPage             from './pages/page_signin';
import BookingPage            from './pages/page_booking';
import ConfirmAppointmentPage from './pages/page_confirm'
// import requireAuth          from '../components/hoc/require_authentication';

export default (
  <Route path="/" component={App} >
    <IndexRoute component={HomePage} />
    <Route path="/signin" component={SigninPage}/>
    <Route path='/booking' component={BookingPage}/>
    <Route path='/confirm' component={ConfirmAppointmentPage} />
  </Route>
);
