import firebase from 'firebase';
import config from './config';

const firebaseConfig = {
  ...config.firebase
};

export const db = firebase.firestore();

const fire = firebase.initializeApp(firebaseConfig);
export default fire;
