import {
  FirebaseAuthProvider,
  FirebaseDataProvider,
  RAFirebaseOptions,
} from "react-admin-firebase";
import { initializeApp, getApps } from "firebase/app";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { AuthProvider } from "react-admin";
import { Role, Permissions, DEFAULT_ROLE } from "../types/permissions";

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

// Helper function to wait for authenticated user
// Handles race condition where getPermissions is called before auth state is fully ready
const waitForAuthenticatedUser = (): Promise<User | null> => {
  return new Promise((resolve) => {
    // Check if user already exists (fast path)
    if (auth.currentUser) {
      resolve(auth.currentUser);
      return;
    }

    // Wait for auth state to be ready
    auth
      .authStateReady()
      .then(() => {
        // Check again after auth state is ready (user might be set during ready check)
        if (auth.currentUser) {
          resolve(auth.currentUser);
          return;
        }

        // Add a small delay to catch cases where user is set immediately after authStateReady
        // This handles race conditions during login
        setTimeout(() => {
          if (auth.currentUser) {
            resolve(auth.currentUser);
            return;
          }

          // If still no user, set up listener for auth state changes
          // This catches the case where user logs in after we've already checked
          let hasResolved = false;
          const unsubscribe = onAuthStateChanged(auth, (user) => {
            // Resolve only once, and only if we get a user (not null)
            // onAuthStateChanged fires immediately, so we check for user
            if (!hasResolved && user) {
              hasResolved = true;
              unsubscribe();
              resolve(user);
            } else if (!hasResolved) {
              // If we get null immediately, it means no user is authenticated
              // Set a timeout to resolve after a brief wait in case login is in progress
              setTimeout(() => {
                if (!hasResolved) {
                  hasResolved = true;
                  unsubscribe();
                  resolve(auth.currentUser);
                }
              }, 1000);
            }
          });

          // Final timeout after 2 seconds total to prevent hanging
          setTimeout(() => {
            if (!hasResolved) {
              hasResolved = true;
              unsubscribe();
              resolve(auth.currentUser);
            }
          }, 2000);
        }, 100); // Small delay to catch immediate post-ready user assignment
      })
      .catch(() => {
        // If authStateReady fails, return current user
        resolve(auth.currentUser);
      });
  });
};

// Custom RBAC-enabled auth provider
export const authProvider: AuthProvider = {
  ...baseAuthProvider,

  // Don't override checkAuth - let base FirebaseAuthProvider handle it properly
  // It already handles Firebase Auth state correctly

  // Override getPermissions to fetch role from Firestore
  getPermissions: async () => {
    try {
      // Wait for authenticated user (handles race condition)
      const user = await waitForAuthenticatedUser();
      if (!user) {
        return Promise.resolve(null);
      }

      // Fetch user document from Firestore to get role
      const userDocRef = doc(db, "users", user.uid);
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
      console.error("Error fetching permissions:", error);
      return Promise.resolve({
        role: DEFAULT_ROLE,
        permissions: [],
      } as Permissions);
    }
  },

  // Override getIdentity to include role information from Firestore
  getIdentity: async () => {
    try {
      // Wait for authenticated user (handles race condition)
      const user = await waitForAuthenticatedUser();
      if (!user) {
        // If no user, return default identity (shouldn't happen if checkAuth works)
        return Promise.resolve({
          id: "anonymous",
          fullName: "Anonymous User",
        });
      }

      // Fetch user document from Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        return Promise.resolve({
          id: user.uid,
          fullName: userData.name || user.displayName || user.email || "User",
          avatar: user.photoURL || undefined,
          role: userData.role || DEFAULT_ROLE,
          account_id: userData.account_id,
          ...userData,
        });
      }

      return Promise.resolve({
        id: user.uid,
        fullName: user.displayName || user.email || "User",
        avatar: user.photoURL || undefined,
        role: DEFAULT_ROLE,
      });
    } catch (error) {
      console.error("Error fetching identity:", error);
      // Return default identity on error
      return Promise.resolve({
        id: "error",
        fullName: "Error loading user",
      });
    }
  },
};

export const dataProvider = FirebaseDataProvider(config, options);
