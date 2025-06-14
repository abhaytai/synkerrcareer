// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBF47FELu7Spi9iw6L0RrWTOIggslAiZHg',
  authDomain: 'synkerr-7011e.firebaseapp.com',
  projectId: 'synkerr-7011e',
  storageBucket: 'synkerr-7011e.firebasestorage.app',
  messagingSenderId: '416750548013',
  appId: '1:416750548013:web:0fe93a6e0f9a76fe97b4a4',
  measurementId: 'G-J7XLBT7DDQ',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
