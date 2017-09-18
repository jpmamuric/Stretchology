import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';

// Pages
import HomePage             from './components/pages/page_home';
import SigninPage           from './components/pages/page_signin';
import BookingNearbyPage    from './components/pages/page_booking_nearby';
// import requireAuth          from '../components/hoc/require_authentication';

export default (
  <Route path="/" component={App} >
    <IndexRoute component={HomePage} />
    <Route path="/signin" component={SigninPage}/>
    <Route path="/booking" component={BookingNearbyPage}/>
  </Route>
);
