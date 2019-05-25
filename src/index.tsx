import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import { configureStore } from './redux/store';
import { configureStore, history } from './redux/store';
// import { Router, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { App } from './containers/App/App';
import { initialState } from './redux/initial-state';
import './themes/style.css';


const store = configureStore(initialState);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
