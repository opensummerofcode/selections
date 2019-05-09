import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import config from './config';

const firebaseConfig = {
  ...config.firebase
};

const fire = firebase.initializeApp(firebaseConfig);
export const authProvider = new firebase.auth.GoogleAuthProvider();
export const db = fire.firestore();
export const auth = fire.auth();
export const authPersistence = firebase.auth.Auth.Persistence.LOCAL;

export default fire;
