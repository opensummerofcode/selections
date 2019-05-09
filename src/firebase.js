import firebase from 'firebase';
import config from './config';

const firebaseConfig = {
  ...config.firebase
};

const fire = firebase.initializeApp(firebaseConfig);

export const db = fire.firestore();
export default fire;
