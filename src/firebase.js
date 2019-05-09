import firebase from 'firebase';
import config from './config';

const firebaseConfig = {
  ...config.firebase
};

const fire = firebase.initializeApp(firebaseConfig);

export const db = fire.firestore();
export const auth = fire.auth();
export default fire;
