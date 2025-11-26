import { useAuthProvider } from "react-admin";
import { useEffect, useState } from "react";
import { Permissions, Role, ResourceAction } from "../types/permissions";
import { auth } from "../providers/dataProvider.firebase";
import { onAuthStateChanged } from "firebase/auth";

export const usePermissions = () => {
  const authProvider = useAuthProvider();
  const [permissions, setPermissions] = useState<
    Permissions | null | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch permissions directly from authProvider
  const fetchPermissions = async () => {
    if (!authProvider?.getPermissions) {
      console.log("usePermissions: No authProvider.getPermissions available");
      setIsLoading(false);
      return;
    }

    try {
      console.log("usePermissions: Fetching permissions...");
      setIsLoading(true);
      const perms = await authProvider.getPermissions({});
      console.log("usePermissions: Fetched permissions:", perms);
      setPermissions(perms as Permissions | null | undefined);
      setIsLoading(false);
    } catch (error) {
      console.error("usePermissions: Error fetching permissions:", error);
      setPermissions(null);
      setIsLoading(false);
    }
  };

  // Listen to Firebase auth state changes and fetch permissions when user logs in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(
        "usePermissions: Auth state changed, user:",
        user ? user.uid : "null",
      );
      if (user) {
        // User is logged in, fetch permissions
        fetchPermissions();
      } else {
        // User logged out
        setPermissions(null);
        setIsLoading(false);
      }
    });

    // Also fetch immediately if user is already logged in
    if (auth.currentUser) {
      fetchPermissions();
    } else {
      setIsLoading(false);
    }

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authProvider]);

  // Log for debugging
  if (permissions) {
    console.log("usePermissions: Permissions loaded:", permissions);
  } else if (isLoading) {
    console.log("usePermissions: Permissions loading...");
  } else {
    console.log("usePermissions: Permissions not loaded (null/undefined)");
  }

  const hasRole = (role: Role | Role[]): boolean => {
    if (!permissions?.role) return false;
    const roles = Array.isArray(role) ? role : [role];
    return roles.includes(permissions.role);
  };

  const hasPermission = (permission: string): boolean => {
    if (!permissions?.permissions) return false;
    return permissions.permissions.includes(permission);
  };

  const belongsToAccount = (accountId: string | undefined): boolean => {
    if (!permissions?.account_id) return false;
    if (!accountId) return false;
    return permissions.account_id === accountId;
  };

  const canAccess = (
    resource: string,
    action: ResourceAction,
  ): boolean | undefined => {
    // If still loading, return undefined
    if (isLoading) {
      console.log("usePermissions: Still loading, returning undefined");
      return undefined;
    }

    // If permissions are not loaded yet (undefined or null), return undefined to indicate loading state
    if (!permissions || !permissions.role) {
      console.log(
        "usePermissions: Permissions not loaded, returning undefined (loading state)",
      );
      return undefined;
    }

    const role = permissions.role;
    const userAccountId = permissions.account_id;

    // Define access matrix for each resource/action combination
    const accessRules: Record<string, Record<ResourceAction, Role[]>> = {
      accounts: {
        list: ["admin", "manager"],
        create: ["admin"],
        edit: ["admin"],
        show: ["admin", "manager"],
        delete: ["admin"],
      },
      users: {
        list: ["admin", "manager"],
        create: ["admin", "manager"],
        edit: ["admin", "manager"],
        show: ["admin", "manager"],
        delete: ["admin"],
      },
      properties: {
        list: ["admin", "manager", "viewer"],
        create: ["admin", "manager"],
        edit: ["admin", "manager"],
        show: ["admin", "manager", "viewer", "resident"],
        delete: ["admin"],
      },
      residents: {
        list: ["admin", "manager", "viewer"],
        create: ["admin", "manager"],
        edit: ["admin", "manager"],
        show: ["admin", "manager", "viewer", "resident"],
        delete: ["admin"],
      },
      visitors: {
        list: ["admin", "manager", "viewer"],
        create: ["admin", "manager", "viewer"],
        edit: ["admin", "manager"],
        show: ["admin", "manager", "viewer"],
        delete: ["admin", "manager"],
      },
      recurrent_visitors: {
        list: ["admin", "manager", "viewer"],
        create: ["admin", "manager", "viewer"],
        edit: ["admin", "manager"],
        show: ["admin", "manager", "viewer"],
        delete: ["admin", "manager"],
      },
      fees: {
        list: ["admin", "manager"],
        create: ["admin", "manager"],
        edit: ["admin", "manager"],
        show: ["admin", "manager", "resident"],
        delete: ["admin"],
      },
    };

    const allowedRoles = accessRules[resource]?.[action] || [];
    const hasRoleAccess = allowedRoles.includes(role as Role);

    // For non-admin users, check account scope
    if (role !== "admin" && hasRoleAccess && userAccountId) {
      // Account scoping will be handled in Firestore rules and data filtering
      // For now, just check role access
      return true;
    }

    return hasRoleAccess;
  };

  return {
    permissions,
    hasRole,
    hasPermission,
    canAccess,
    belongsToAccount,
  };
};
