import {
 FirebaseAuthProvider,
  FirebaseDataProvider,
  RAFirebaseOptions
} from 'react-admin-firebase';

const config = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
  measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// All options are optional
const options: RAFirebaseOptions = {
    logging: true,
}

export const authProvider = FirebaseAuthProvider(config, options);

export const dataProvider = FirebaseDataProvider(config, options);
