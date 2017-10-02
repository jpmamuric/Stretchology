import React                            from 'react';
import ReactDOM                         from 'react-dom';
import { Provider }                     from 'react-redux';
import { composeWithDevTools }          from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import createSocketIoMiddleware         from 'redux-socket.io';
import io                               from 'socket.io-client';
import thunk                            from 'redux-thunk';
import { Router, browserHistory }       from 'react-router';
import reducers                         from './reducers';
import routes                           from './routes';
import * as types                       from './actions/types';
import './index.css';

let socket = io('http://localhost:3000');
let socketIoMiddleware = createSocketIoMiddleware(socket, 'server/');

const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(thunk, socketIoMiddleware)
  )
);

const socketId = localStorage.getItem('socketId');

if (socketId) {
  store.dispatch( {type: types.STRETCHOLOGIST_STATUS_ACTIVE });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes}/>
  </Provider>,
  document.getElementById('root')
);
