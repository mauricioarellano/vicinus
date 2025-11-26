# Implement Role-Based Access Control (RBAC) with Firebase

## Summary

Implements RBAC with account-scoped permissions using Firebase Authentication and Firestore. Roles: admin, manager, resident, and viewer. Permissions are enforced at both the UI and Firestore security rules levels.

## Changes

### New Files

- `src/types/permissions.ts` - Type definitions for roles and permissions
- `src/hooks/usePermissions.ts` - Custom hook for permission checks
- `src/components/PermissionsLoading.tsx` - Loading component shown while permissions are being fetched

### Modified Files

- `src/providers/dataProvider.firebase.ts` - Extended auth provider to fetch roles from Firestore, overrides `getPermissions` and `getIdentity` methods
- `src/App.tsx` - Always render resources (auth handled by base provider)
- `firestore.rules` - Added RBAC security rules for protected collections
- Resource components with RBAC (`Accounts.tsx`, `Users.tsx`, `Properties.tsx`, `Residents.tsx`, `Visitors.tsx`, `RecurrentVisitors.tsx`, `Fees.tsx`) - Added permission checks using `usePermissions` hook

### Resources Without RBAC (TODO)

The following resources exist but do not yet have permission checks implemented:

- `fee_amounts` - No permission checks or Firestore security rules
- `roles` - No permission checks or Firestore security rules

## Firebase Configuration Required

### 1. Deploy Firestore Security Rules

Deploy the updated security rules to Firebase:

```bash
firebase deploy --only firestore:rules
```

Or manually in Firebase Console:

1. Open Firebase Console
2. Go to Firestore Database → Rules tab
3. Copy and paste the contents of `firestore.rules`
4. Click "Publish"

**Collections with Security Rules:**

- `users` - Role-based access with account scoping
- `accounts` - Admin and manager access with account scoping
- `properties` - Account-scoped access
- `residents` - Account-scoped access
- `visitors` - Account-scoped access, residents can create
- `recurrent_visitors` - Account-scoped access, residents can create
- `fees` - Account-scoped access, residents can view their own

**Collections without Security Rules (TODO):**

- `fee_amounts` - No security rules defined
- `roles` - No security rules defined

### 2. Create User Documents in Firestore

For each authenticated user, create a document in the `users` collection.

**Collection structure:**

- Collection name: `users`
- Document ID: Firebase Auth UID (same as the user's authentication UID)

**Required fields:**

```json
{
  "role": "admin",
  "account_id": "optional-account-id",
  "name": "User Name",
  "email": "user@example.com"
}
```

**Role values:**

- `"admin"` - Full access across all accounts
- `"manager"` - Access to assigned account
- `"resident"` - Limited access to own data
- `"viewer"` - Read-only access to assigned account

**How to create user documents:**

**Option A: Manual creation (for testing)**

1. User logs in via Firebase Authentication
2. Note their UID from Firebase Console → Authentication
3. Go to Firestore Database → Create collection → `users`
4. Create document with ID = user's UID
5. Add fields: `role` (string), optionally `account_id` (string), `name`, `email`

**Option B: Automatic creation (recommended for production)**
Create user documents automatically via:

- Firebase Cloud Functions (Auth trigger)
- Client-side code after successful login
- Admin script

Example structure after login:

```
Collection: users
Document ID: abc123xyz (Firebase Auth UID)
Fields:
  - role: "manager"
  - account_id: "account-001"
  - name: "John Doe"
  - email: "john@example.com"
```

### 3. Verify Firebase Authentication

Ensure your authentication method is enabled:

1. Firebase Console → Authentication → Sign-in method
2. Enable Email/Password (or other methods you use)

## Access Control Matrix

| Resource           | Action             | Admin | Manager         | Resident | Viewer          |
| ------------------ | ------------------ | ----- | --------------- | -------- | --------------- |
| accounts           | list               | ✓     | ✓ (own)         | ✗        | ✗               |
| accounts           | show               | ✓     | ✓ (own)         | ✗        | ✗               |
| accounts           | create/edit/delete | ✓     | ✗               | ✗        | ✗               |
| users              | list               | ✓     | ✓ (own account) | ✗        | ✗               |
| users              | show               | ✓     | ✓ (own account) | ✗        | ✗               |
| users              | create/edit        | ✓     | ✓ (own account) | ✗        | ✗               |
| users              | delete             | ✓     | ✗               | ✗        | ✗               |
| properties         | list               | ✓     | ✓ (own account) | ✗        | ✓ (own account) |
| properties         | show               | ✓     | ✓ (own account) | ✓ (own)  | ✓ (own account) |
| properties         | create/edit        | ✓     | ✓ (own account) | ✗        | ✗               |
| properties         | delete             | ✓     | ✗               | ✗        | ✗               |
| residents          | list               | ✓     | ✓ (own account) | ✗        | ✓ (own account) |
| residents          | show               | ✓     | ✓ (own account) | ✓ (own)  | ✓ (own account) |
| residents          | create/edit        | ✓     | ✓ (own account) | ✗        | ✗               |
| residents          | delete             | ✓     | ✗               | ✗        | ✗               |
| visitors           | list               | ✓     | ✓ (own account) | ✗        | ✓ (own account) |
| visitors           | show               | ✓     | ✓ (own account) | ✗        | ✓ (own account) |
| visitors           | create             | ✓     | ✓ (own account) | ✓        | ✓ (own account) |
| visitors           | edit               | ✓     | ✓ (own account) | ✗        | ✗               |
| visitors           | delete             | ✓     | ✓ (own account) | ✗        | ✗               |
| recurrent_visitors | list               | ✓     | ✓ (own account) | ✗        | ✓ (own account) |
| recurrent_visitors | show               | ✓     | ✓ (own account) | ✗        | ✓ (own account) |
| recurrent_visitors | create             | ✓     | ✓ (own account) | ✓        | ✓ (own account) |
| recurrent_visitors | edit               | ✓     | ✓ (own account) | ✗        | ✗               |
| recurrent_visitors | delete             | ✓     | ✓ (own account) | ✗        | ✗               |
| fees               | list               | ✓     | ✓ (own account) | ✗        | ✗               |
| fees               | show               | ✓     | ✓ (own account) | ✓ (own)  | ✗               |
| fees               | create/edit        | ✓     | ✓ (own account) | ✗        | ✗               |
| fees               | delete             | ✓     | ✗               | ✗        | ✗               |

**Notes:**

- "own account" means resources where `account_id` matches the user's `account_id`
- "own" for residents means resources where the resident is the authenticated user
- "own" for fees means fees where `user_id` matches the authenticated user's UID
- Account scoping is enforced at both UI and Firestore security rules levels

## Testing

1. Deploy Firestore rules to Firebase
2. Create a test user in Firebase Authentication
3. Create a user document in Firestore `users` collection with a role
4. Log in and verify:
   - Correct resources are shown in the menu
   - Access restrictions work as expected
   - Firestore rules block unauthorized access

## Default Behavior

If a user document is missing, the user receives the `viewer` role by default.

## Breaking Changes

None. Existing authentication continues to work. Users without Firestore documents default to `viewer` role.

## Migration Notes

- Existing users without Firestore documents will need `users` collection documents created
- All users should be assigned appropriate roles
- Account-scoped users need their `account_id` set

## Implementation Details

### Permission Checking Flow

1. **Authentication**: User authenticates via Firebase Authentication
2. **Role Fetching**: On login, `authProvider.getPermissions()` fetches user document from Firestore `users` collection
3. **Permission Storage**: Role and `account_id` are stored in the auth provider's permission state
4. **UI Checks**: Resource components use `usePermissions()` hook to check access before rendering
5. **Loading State**: `PermissionsLoading` component is shown while permissions are being fetched
6. **Firestore Rules**: Security rules enforce access at the database level as a second layer of protection

### Auth Provider Overrides

The `dataProvider.firebase.ts` extends the base Firebase auth provider with:

- **`getPermissions()`**: Fetches user role and account_id from Firestore `users` collection. Returns default `viewer` role if user document doesn't exist.
- **`getIdentity()`**: Enhanced to include role and account_id information from Firestore user document.

### Permission Hook API

The `usePermissions()` hook provides:

- `permissions`: Current permissions object with `role`, `account_id`, and `permissions` array
- `hasRole(role)`: Check if user has specific role(s)
- `hasPermission(permission)`: Check if user has specific permission string
- `canAccess(resource, action)`: Check if user can perform action on resource (returns `true`, `false`, or `undefined` for loading)
- `belongsToAccount(accountId)`: Check if user belongs to specific account

## Additional Notes

- Permissions are checked at both UI component level and Firestore security rules level
- Account scoping is enforced for non-admin users
- Security rules prevent unauthorized data access at the database level
- Resources without RBAC (`fee_amounts`, `roles`) should be protected before production use
