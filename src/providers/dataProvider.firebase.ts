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
      console.log("waitForAuthenticatedUser: User already exists, fast path");
      resolve(auth.currentUser);
      return;
    }

    console.log(
      "waitForAuthenticatedUser: No user yet, waiting for auth state...",
    );

    // Use onAuthStateChanged to wait for auth state
    // This fires immediately with current state, then on changes
    let hasResolved = false;
    let initialCheck = true;
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log(
        "waitForAuthenticatedUser: onAuthStateChanged fired, user:",
        user ? user.uid : "null",
        "initialCheck:",
        initialCheck,
      );

      if (hasResolved) return;

      // First, ensure auth state is ready
      if (initialCheck) {
        initialCheck = false;
        try {
          await auth.authStateReady();
          // Re-check user after auth state is ready
          if (auth.currentUser) {
            hasResolved = true;
            unsubscribe();
            console.log(
              "waitForAuthenticatedUser: User found after authStateReady:",
              auth.currentUser.uid,
            );
            resolve(auth.currentUser);
            return;
          }
        } catch (error) {
          console.error(
            "waitForAuthenticatedUser: Error in authStateReady:",
            error,
          );
        }
      }

      // If we get a user (either from initial check or state change), resolve
      if (user) {
        hasResolved = true;
        unsubscribe();
        console.log("waitForAuthenticatedUser: Resolving with user:", user.uid);
        resolve(user);
        return;
      }

      // If we get null, user might still be logging in
      // Continue waiting for the next auth state change
    });

    // Timeout after 5 seconds to prevent hanging
    setTimeout(() => {
      if (!hasResolved) {
        hasResolved = true;
        unsubscribe();
        console.log(
          "waitForAuthenticatedUser: Timeout after 5s, resolving with:",
          auth.currentUser ? auth.currentUser.uid : "null",
        );
        resolve(auth.currentUser);
      }
    }, 5000);
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
        console.log("getPermissions: No authenticated user, returning null");
        return Promise.resolve(null);
      }

      console.log(
        "getPermissions: User authenticated, fetching role for:",
        user.uid,
      );

      // Fetch user document from Firestore to get role
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const role = (userData.role || DEFAULT_ROLE) as Role;
        const permissions = userData.permissions || [];
        const account_id = userData.account_id;

        console.log("getPermissions: Found user document, role:", role);

        // Return role and permissions
        const perms: Permissions = {
          role,
          permissions,
          account_id,
        };
        return Promise.resolve(perms);
      }

      console.log(
        "getPermissions: User document not found, returning default role",
      );

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
