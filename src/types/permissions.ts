export type Role = 'admin' | 'manager' | 'resident' | 'viewer';

export interface Permissions {
  role: Role;
  account_id?: string;
  permissions?: string[];
}

export type ResourceAction = 'list' | 'create' | 'edit' | 'show' | 'delete';

export interface ResourcePermission {
  resource: string;
  actions: ResourceAction[];
}

export const ROLE_HIERARCHY: Record<Role, number> = {
  admin: 4,
  manager: 3,
  resident: 2,
  viewer: 1,
};

export const DEFAULT_ROLE = 'viewer' as Role;

