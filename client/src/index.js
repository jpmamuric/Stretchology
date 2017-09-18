import React                            from 'react';
import ReactDOM                         from 'react-dom';
import { Provider }                     from 'react-redux';
import { Router, browserHistory }       from 'react-router';
import { composeWithDevTools }          from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import Thunk                            from 'redux-thunk';
import routes                           from './routes';
import reducers                         from './reducers'
import './index.css';

const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(Thunk)
  )
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes}/>
  </Provider>,
  document.getElementById('root')
);
