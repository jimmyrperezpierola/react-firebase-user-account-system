// import * as firebase from 'firebase/app';
// import { FirebaseConfig } from './firebase-config';

// export const firebaseApp = () => aFirebaseApp
// let aFirebaseApp: any = null

// export const initializeFirebase = () => {
//     aFirebaseApp = firebase.initializeApp(FirebaseConfig);
// }
// export const authRef = () => firebaseApp().auth();


import * as firebase from "firebase";

// import { FirebaseConfig } from "../config/keys";
import { FirebaseConfig } from '../config/firebase-config';
firebase.initializeApp(FirebaseConfig);

export const authRef = firebase.auth();
export const provider = new firebase.auth.EmailAuthProvider();
