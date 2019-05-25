import { Store, createStore, compose, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

import { reducers, AppState } from '../reducers';
import { logger } from '../middleware';
import thunk from 'redux-thunk';

export const history = createBrowserHistory();

export function configureStore(initialState: AppState): Store<AppState> {
  const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    reducers(history as any) as any,
    initialState,
    composeEnhancers(
      applyMiddleware(
        logger,
        thunk,
        routerMiddleware(history as any),
      ),
    ),
  ) as Store<AppState>;

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
