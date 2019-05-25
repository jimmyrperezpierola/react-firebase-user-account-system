import { AuthActionTypes } from '../actions/action-types';

const initialState: any = {
  firebaseUser: null
};

export const userReducer = (state = initialState, action: any) =>  {
  switch (action.type) {
    case AuthActionTypes.CREATE_ACCOUNT:
      return state;
    case AuthActionTypes.DEACTIVATE_ACCOUNT:
      return state;
    case AuthActionTypes.DELETE_ACCOUNT:
      return state;
    case AuthActionTypes.FETCH_USER:
      return state;
    case AuthActionTypes.RESET_PASSWORD:
      return state;
    case AuthActionTypes.REQUEST_PASSWORD_RESET:
      return state;    
    case AuthActionTypes.SIGN_IN:
      return {...state, firebaseUser: action.payload};
    case AuthActionTypes.SIGN_OUT:
      return {...state, firebaseUser: null};   
    case AuthActionTypes.UPDATE_EMAIL:
      return state;    
    case AuthActionTypes.UPDATE_PASSWORD:
      return state;       
    default:
      return state;
  }
}
