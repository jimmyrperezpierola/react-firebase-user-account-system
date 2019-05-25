import { AuthActionTypes, NavActionTypes } from './action-types';
import { authRef } from '../../config/firebase';
import { navigateTo, setBannerText } from '../actions/navActions';
import { ROUTES } from '../../models/routes';
import { User as firebaseUser } from 'firebase';
var config = require('../../config/example-config.json');

let aFirebaseConfig: any = (process.env.NODE_ENV === "development") ? 
config.dev:
config.prod;
//firebaseFunctions.config().dev :
//firebaseFunctions.config().prod;

let verifiedEmailUrl:string = `${aFirebaseConfig.host}:${aFirebaseConfig.port || ''}/login?verifiedEmail=true`;
let resetPasswordUrl:string = `${aFirebaseConfig.host}:${aFirebaseConfig.port || ''}/login?resetPassword=true`;

export const createAccount = (firstName: string, lastName: string, 
  email: string, password: string) => async (dispatch: any) => {
   let successMessage: string = 'Please check your inbox to verify your email.';
    try {
    let aFirebaseUser:firebaseUser = await authRef.createUserWithEmailAndPassword(email, password);
    if(aFirebaseUser){
      await aFirebaseUser.sendEmailVerification({ url: `${verifiedEmailUrl}` })
      await aFirebaseUser.updateProfile({
        displayName: `${firstName} ${lastName}`,
        photoURL: null
      });
      console.log(aFirebaseUser);
      dispatch({type: AuthActionTypes.SIGN_IN, payload: aFirebaseUser});
      dispatch(navigateTo(ROUTES.ACCOUNT));
      dispatch({type: NavActionTypes.SET_BANNER_TEXT, payload: successMessage});
    }
  } catch(error) {
    console.log("Cannot create account: " + error);
    dispatch({type: NavActionTypes.SET_BANNER_TEXT, payload: error.message});
    return error;
  }
}

export const signIn = (email: string, password: string) => (dispatch: any) => {
  try {
    authRef
        .signInWithEmailAndPassword(email, password)
        .then((userCredential: any) => {
          console.log(userCredential);
          dispatch({type: AuthActionTypes.SIGN_IN, payload: userCredential});
          dispatch(navigateTo(ROUTES.ACCOUNT));
        })
        .catch((error: any) => {
          console.log(error);
          dispatch({type: NavActionTypes.SET_BANNER_TEXT, payload: error.message});
        });
  } catch(error) {
    console.log("Cannot sign in");
    dispatch({type: NavActionTypes.SET_BANNER_TEXT, payload: error})
  }
}

export const signOut = () => (dispatch: any) => {
    authRef
        .signOut()
        .then(() => {
          dispatch({type: AuthActionTypes.SIGN_OUT, payload: null});
          dispatch(navigateTo(ROUTES.LOGIN));
          // Sign-out successful.
          console.log('signed out!');
        })
        .catch((error: any) => {
          console.log('sign out failure: ', error);
        });
};

export const updateEmail = (email: string) => async (dispatch: any) => {
   let successMessage: string = 'Please check your inbox to verify your email.';
    let aFirebaseUser:firebaseUser | null = authRef.currentUser;
    try {
      if(aFirebaseUser){
        await aFirebaseUser.updateEmail(email);
        await aFirebaseUser.sendEmailVerification({ url: `${verifiedEmailUrl}` })
        dispatch(navigateTo(ROUTES.ACCOUNT));
        dispatch({type: NavActionTypes.SET_BANNER_TEXT, payload: successMessage})
    }
    } catch (error) {
      console.log(error);
      dispatch({type: NavActionTypes.SET_BANNER_TEXT, payload: error.message});
    }

}

export const updatePassword = (password: string) => (dispatch: any) => {
  let successMessage: string = 'Your password has been changed!';
    let aFirebaseUser = authRef.currentUser || null
    if(aFirebaseUser){
        aFirebaseUser
            .updatePassword(password)
            .then(() => {
              //dispatch(AuthActionTypes.UPDATE_PASSWORD)
              dispatch({type: NavActionTypes.SET_BANNER_TEXT, payload: successMessage});
              dispatch(navigateTo(ROUTES.ACCOUNT));
            })
            .catch((error: any) => {
              console.log(error);
              dispatch({type: NavActionTypes.SET_BANNER_TEXT, payload: error.message});      
            })
    }
    else{
        console.log('user is not set');
    }
}

export const sendPasswordResetEmail = (email: string) => async (dispatch: any) => {
  let actionCodeSettings = { url: `${resetPasswordUrl}`};
  let successMessage = 'Sent! Check your email for a link to reset your password.';
    try {
      let result = await authRef
                        .sendPasswordResetEmail(email, actionCodeSettings);
                        dispatch(navigateTo(ROUTES.LOGIN));
                        dispatch(setBannerText(successMessage));
      console.log(result);
    } catch (error) {
      console.log(error.message);
      dispatch(setBannerText(error.message));
    }
}
 
export const confirmPasswordReset = (code: string, newPassword: string) => async (dispatch: any) => {
    try {
      let result = await authRef
                          .confirmPasswordReset(code, newPassword);
      console.log(result);
    } catch (error) {
      console.log(error.message);
    }
}

export const deleteUser = () => async (dispatch: any) => {
  try {
    let aFirebaseUser = authRef.currentUser || null
    if(aFirebaseUser){
        aFirebaseUser
            .delete()
    }
    else{
        console.log('user is not set')
    }
  } catch (error) {
    console.log(error.message);
  }
}