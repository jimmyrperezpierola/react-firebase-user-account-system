import { ROUTES } from '../../models/routes';
import { push } from 'connected-react-router';
import { NavActionTypes } from '../actions/action-types'

export const navigateTo = (route: ROUTES) => (dispatch: any) => {
  try {
    dispatch({type: NavActionTypes.CLEAR_BANNER_TEXT, payload: null});
    dispatch(push(route));
  } catch(err) {
    console.log("Cannot navigate:", err);
  }
}

export const clearBannerText = () => (dispatch: any) => {
  try {
    console.log('clearing banner text')
    dispatch({type: NavActionTypes.CLEAR_BANNER_TEXT, payload: null});
  } catch(err) {
    console.log("Cannot clear alert:", err);
  }
}

export const setBannerText = (bannerText: string) => (dispatch: any) => {
  try {
    console.log('setting banner text')
    dispatch({type: NavActionTypes.SET_BANNER_TEXT, payload: bannerText});
  } catch(err) {
    console.log("Cannot set banner text:", err);
  }
}