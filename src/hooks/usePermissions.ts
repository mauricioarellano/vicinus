import { useGetPermissions, useRefresh } from "react-admin";
import { useEffect, useState } from "react";
import { Permissions, Role, ResourceAction } from "../types/permissions";
import { auth } from "../providers/dataProvider.firebase";
import { onAuthStateChanged } from "firebase/auth";

export const usePermissions = () => {
  const refresh = useRefresh();
  const permissionsResult = useGetPermissions();
  const typedPermissions = permissionsResult as unknown as
    | Permissions
    | null
    | undefined;

  const [lastAuthState, setLastAuthState] = useState<string | null>(null);

  // Listen to Firebase auth state changes and trigger a refresh when user logs in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const currentUid = user?.uid || null;
      console.log(
        "usePermissions: Auth state changed, user:",
        currentUid,
        "previous:",
        lastAuthState,
      );

      // If user just logged in (was null, now has uid), trigger refresh
      if (!lastAuthState && currentUid) {
        console.log("usePermissions: User logged in, triggering refresh");
        setTimeout(() => {
          refresh();
        }, 500); // Small delay to ensure auth state is fully ready
      }

      setLastAuthState(currentUid);
    });

    return () => unsubscribe();
  }, [refresh, lastAuthState]);

  // Log for debugging
  if (typedPermissions) {
    console.log("usePermissions: Permissions loaded:", typedPermissions);
  } else {
    console.log("usePermissions: Permissions not loaded yet (null/undefined)");
  }

  const hasRole = (role: Role | Role[]): boolean => {
    if (!typedPermissions?.role) return false;
    const roles = Array.isArray(role) ? role : [role];
    return roles.includes(typedPermissions.role);
  };

  const hasPermission = (permission: string): boolean => {
    if (!typedPermissions?.permissions) return false;
    return typedPermissions.permissions.includes(permission);
  };

  const belongsToAccount = (accountId: string | undefined): boolean => {
    if (!typedPermissions?.account_id) return false;
    if (!accountId) return false;
    return typedPermissions.account_id === accountId;
  };

  const canAccess = (
    resource: string,
    action: ResourceAction,
  ): boolean | undefined => {
    // If permissions are not loaded yet (undefined or null), return undefined to indicate loading state
    // This allows React to re-render components once permissions are loaded
    if (!typedPermissions || !typedPermissions.role) {
      console.log(
        "canAccess: Permissions not loaded yet, returning undefined (loading state)",
      );
      return undefined;
    }

    const role = typedPermissions.role;
    const userAccountId = typedPermissions.account_id;

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
    permissions: typedPermissions,
    hasRole,
    hasPermission,
    canAccess,
    belongsToAccount,
  };
};
