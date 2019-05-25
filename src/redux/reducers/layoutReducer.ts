import { NavActionTypes } from '../actions/action-types'

const initialState: any = {
  bannerText: ''
};

export const layoutReducer = (state = initialState, action: any) =>  {
  switch (action.type) {
    case NavActionTypes.CLEAR_BANNER_TEXT:
      return {...state, bannerText: ''}
    case NavActionTypes.SET_BANNER_TEXT:
      return {...state, bannerText: action.payload}
    default:
      return state;
  }
}