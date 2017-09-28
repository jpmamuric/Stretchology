import React, { Component }     from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect }              from 'react-redux';

import MuiThemeProvider         from 'material-ui/styles/MuiThemeProvider';
import Nav                      from './home/nav/Nav';
import HomePage                 from '../pages/page_home';
// import SigninPage               from '../pages/page_signin';
import BookingPage              from '../pages/page_booking';
import ConfirmAppointmentPage   from '../pages/page_confirm'

import * as actions             from '../actions/auth';
import './App.css';
import getMuiTheme              from 'material-ui/styles/getMuiTheme';
import { blue200 }              from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blue200,
  },
  appBar: {
    height: 80,
  },
});

class App extends Component {
  componentDidMount(){
    this.props.fetchUser();
    this.props.getCurrentLocation();
    this.props.fetchSocketId();
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
          <BrowserRouter>
            <div>
              <Nav />
              <Route exact path='/' component={HomePage}/>
              <Route exact path='/booking' component={BookingPage}/>
              <Route exact path="/confirm" component={ConfirmAppointmentPage} />
            </div>
          </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default connect(null, actions)(App);
