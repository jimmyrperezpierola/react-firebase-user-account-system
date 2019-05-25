import { User as firebaseUser } from 'firebase';

export interface AppState {
  firebaseUser: any;
  router: any;
  layout: any;
}

export namespace AppState {
  export type FirebaseUserState = firebaseUser;
}
