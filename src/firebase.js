import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDDEUTpWJ8SFWZ0S7hzoLLFoIyKOgiBVqQ',
  authDomain: 'osoc-selections-202.firebaseapp.com',
  projectId: 'osoc-selections-202',
  storageBucket: 'osoc-selections-202.appspot.com',
  messagingSenderId: '983468915309',
  appId: '1:983468915309:web:8face8aae1ac5cdef01d64'
};

const fire = firebase.initializeApp(firebaseConfig);
export const authProvider = new firebase.auth.GoogleAuthProvider();

export const db = fire.firestore();
export const auth = fire.auth();
auth.useDeviceLanguage();

export const storage = fire.storage();

export default fire;
