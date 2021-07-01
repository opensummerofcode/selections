import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBKVUl4HYEm3gVLmqG0aOP8BjeMGfe3WWw',
  authDomain: 'selections-playground.firebaseapp.com',
  projectId: 'selections-playground',
  storageBucket: 'selections-playground.appspot.com',
  messagingSenderId: '445367300630',
  appId: '1:445367300630:web:6400beb1254293c2217b37'
};

const fire = firebase.initializeApp(firebaseConfig);
export const authProvider = new firebase.auth.GoogleAuthProvider();

export const db = fire.firestore();
export const auth = fire.auth();
auth.useDeviceLanguage();

export const storage = fire.storage();

export default fire;
