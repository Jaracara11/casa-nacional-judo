import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCUW00Eg4gXDMdx4Fl0947uU9i9NeUgLkc',
  authDomain: 'casa-nacional-judo.firebaseapp.com',
  projectId: 'casa-nacional-judo',
  storageBucket: 'casa-nacional-judo.appspot.com',
  messagingSenderId: '356403942688',
  appId: '1:356403942688:web:fb22fd197ab5b64356f345'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
