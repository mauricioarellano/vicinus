import {
 FirebaseAuthProvider,
  FirebaseDataProvider,
  RAFirebaseOptions
} from 'react-admin-firebase';

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// All options are optional
const options: RAFirebaseOptions = {
    logging: true,
}

export const authProvider = FirebaseAuthProvider(config, options);

export const dataProvider = FirebaseDataProvider(config, options);
