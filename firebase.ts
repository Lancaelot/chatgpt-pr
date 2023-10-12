import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB3sxUBx8MiQ4O5WIwlPUVBGvkVNxF1OnU',
  authDomain: 'chatgpt-digis.firebaseapp.com',
  projectId: 'chatgpt-digis',
  storageBucket: 'chatgpt-digis.appspot.com',
  messagingSenderId: '1034580522323',
  appId: '1:1034580522323:web:728a77f87bdcad58b95da6',
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
