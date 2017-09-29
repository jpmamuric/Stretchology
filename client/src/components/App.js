import React, { Component }     from 'react';
import { connect }              from 'react-redux';

import MuiThemeProvider         from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme              from 'material-ui/styles/getMuiTheme';
import { blue200 }              from 'material-ui/styles/colors';
import Nav                      from './home/nav/Nav';

import * as actions             from '../actions/auth';

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
        <div>
          <Nav />
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default connect(null, actions)(App);
