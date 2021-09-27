import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: `${process.env.FIREBASE_API_KEY}`,
  authDomain: 'cars-data-1506b.firebaseapp.com',
  projectId: 'cars-data-1506b',
  storageBucket: 'cars-data-1506b.appspot.com',
  messagingSenderId: '528410717621',
  messagingSenderId: '528410717621',
  appId: `${process.env.FIREBASE_APP_ID}`,
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();

export default db;
