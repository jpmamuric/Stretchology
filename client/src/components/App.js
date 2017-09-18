import React, { Component } from 'react';
import { connect }          from 'react-redux'
import MuiThemeProvider     from 'material-ui/styles/MuiThemeProvider';

import * as actions         from '../actions/auth';
import './App.css';
import getMuiTheme          from 'material-ui/styles/getMuiTheme';
import { blue200 }          from 'material-ui/styles/colors';

import Nav                  from './nav/Nav';

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
  }
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="App">
          <Nav />
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default connect(null, actions)(App);
