import {
  FirebaseAuthProvider,
  FirebaseDataProvider,
  RAFirebaseOptions
} from 'react-admin-firebase';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { AuthProvider } from 'react-admin';
import { Role, Permissions, DEFAULT_ROLE } from '../types/permissions';

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase app (reuse existing if already initialized)
let app;
const apps = getApps();
if (apps.length === 0) {
  app = initializeApp(config);
} else {
  app = apps[0];
}

export const db = getFirestore(app);
export const auth = getAuth(app);

// All options are optional
const options: RAFirebaseOptions = {
  logging: true,
};

// Base Firebase auth provider
const baseAuthProvider = FirebaseAuthProvider(config, options);

// Custom RBAC-enabled auth provider
export const authProvider: AuthProvider = {
  ...baseAuthProvider,

  // Override checkAuth to explicitly check Firebase auth state
  checkAuth: async () => {
    try {
      // Wait for auth state to be ready
      await auth.authStateReady();
      const user = auth.currentUser;
      
      console.log('checkAuth - user:', user ? user.uid : 'null');
      
      if (!user) {
        console.log('checkAuth - rejecting: no user');
        return Promise.reject({ message: 'Not authenticated', status: 401 });
      }
      
      console.log('checkAuth - resolving: user authenticated');
      return Promise.resolve();
    } catch (error) {
      console.error('Auth check failed:', error);
      return Promise.reject(error);
    }
  },

  // Override getPermissions to fetch role from Firestore
  getPermissions: async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        return Promise.resolve(null);
      }

      // Fetch user document from Firestore to get role
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const role = (userData.role || DEFAULT_ROLE) as Role;
        const permissions = userData.permissions || [];
        const account_id = userData.account_id;

        // Return role and permissions
        const perms: Permissions = {
          role,
          permissions,
          account_id,
        };
        return Promise.resolve(perms);
      }

      // If user document doesn't exist, return default role
      return Promise.resolve({
        role: DEFAULT_ROLE,
        permissions: [],
      } as Permissions);
    } catch (error) {
      console.error('Error fetching permissions:', error);
      return Promise.resolve({
        role: DEFAULT_ROLE,
        permissions: [],
      } as Permissions);
    }
  },

  // Override getIdentity to include role information from Firestore
  getIdentity: async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        return Promise.resolve(null);
      }

      // Fetch user document from Firestore
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        return Promise.resolve({
          id: user.uid,
          fullName: userData.name || user.displayName || user.email || 'User',
          avatar: user.photoURL || undefined,
          role: userData.role || DEFAULT_ROLE,
          account_id: userData.account_id,
          ...userData,
        });
      }

      return Promise.resolve({
        id: user.uid,
        fullName: user.displayName || user.email || 'User',
        avatar: user.photoURL || undefined,
        role: DEFAULT_ROLE,
      });
    } catch (error) {
      console.error('Error fetching identity:', error);
      return Promise.resolve(null);
    }
  },
};

export const dataProvider = FirebaseDataProvider(config, options);
