import React                            from 'react';
import ReactDOM                         from 'react-dom';
import { Provider }                     from 'react-redux';
import { composeWithDevTools }          from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import createSocketIoMiddleware         from 'redux-socket.io';
import io                               from 'socket.io-client';
import thunk                            from 'redux-thunk';
import reducers                         from './reducers'
import './index.css';

import App from './components/App';

let socket = io('http://localhost:3000');
let socketIoMiddleware = createSocketIoMiddleware(socket, 'server/');

const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(thunk, socketIoMiddleware)
  )
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
