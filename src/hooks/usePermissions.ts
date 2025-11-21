import { useGetPermissions } from 'react-admin';
import { Permissions, Role, ResourceAction } from '../types/permissions';

export const usePermissions = () => {
  const { permissions } = useGetPermissions<Permissions>();

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

  const canAccess = (resource: string, action: ResourceAction): boolean => {
    const role = permissions?.role || 'viewer';
    const userAccountId = permissions?.account_id;

    // Define access matrix for each resource/action combination
    const accessRules: Record<string, Record<ResourceAction, Role[]>> = {
      accounts: {
        list: ['admin', 'manager'],
        create: ['admin'],
        edit: ['admin'],
        show: ['admin', 'manager'],
        delete: ['admin'],
      },
      users: {
        list: ['admin', 'manager'],
        create: ['admin', 'manager'],
        edit: ['admin', 'manager'],
        show: ['admin', 'manager'],
        delete: ['admin'],
      },
      properties: {
        list: ['admin', 'manager', 'viewer'],
        create: ['admin', 'manager'],
        edit: ['admin', 'manager'],
        show: ['admin', 'manager', 'viewer', 'resident'],
        delete: ['admin'],
      },
      residents: {
        list: ['admin', 'manager', 'viewer'],
        create: ['admin', 'manager'],
        edit: ['admin', 'manager'],
        show: ['admin', 'manager', 'viewer', 'resident'],
        delete: ['admin'],
      },
      visitors: {
        list: ['admin', 'manager', 'viewer'],
        create: ['admin', 'manager', 'viewer'],
        edit: ['admin', 'manager'],
        show: ['admin', 'manager', 'viewer'],
        delete: ['admin', 'manager'],
      },
      recurrent_visitors: {
        list: ['admin', 'manager', 'viewer'],
        create: ['admin', 'manager', 'viewer'],
        edit: ['admin', 'manager'],
        show: ['admin', 'manager', 'viewer'],
        delete: ['admin', 'manager'],
      },
      fees: {
        list: ['admin', 'manager'],
        create: ['admin', 'manager'],
        edit: ['admin', 'manager'],
        show: ['admin', 'manager', 'resident'],
        delete: ['admin'],
      },
    };

    const allowedRoles = accessRules[resource]?.[action] || [];
    const hasRoleAccess = allowedRoles.includes(role as Role);

    // For non-admin users, check account scope
    if (role !== 'admin' && hasRoleAccess && userAccountId) {
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

