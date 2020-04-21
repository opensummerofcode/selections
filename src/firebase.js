import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDt6eZOw0s_1Dd8Q6qRSAMn_zL_0IxeD3o',
  authDomain: 'osoc-selections.firebaseapp.com',
  databaseURL: 'https://osoc-selections.firebaseio.com',
  projectId: 'osoc-selections',
  storageBucket: 'osoc-selections.appspot.com',
  appId: '1:15840760909:web:6a40a8fdd661c998bdf804'
};

const fire = firebase.initializeApp(firebaseConfig);
export const authProvider = new firebase.auth.GoogleAuthProvider();

export const db = fire.firestore();
export const auth = fire.auth();
auth.useDeviceLanguage();

export const storage = fire.storage();

export default fire;
