import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { AppState } from '../../models/app-state';
import { userReducer } from './userReducer';
import { layoutReducer } from './layoutReducer';

export { AppState };

// NOTE: current type definition of Reducer in 'redux-actions' module
// doesn't go well with redux@4
export const reducers = (history: any) => combineReducers<AppState>({
  router: connectRouter(history as any),
  firebaseUser: userReducer as any,
  layout: layoutReducer as any
});
