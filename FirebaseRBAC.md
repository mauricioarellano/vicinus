# Implement Role-Based Access Control (RBAC) with Firebase

## Summary

Implements RBAC with account-scoped permissions using Firebase Authentication and Firestore. Roles: admin, manager, resident, and viewer. Permissions are enforced at both the UI and Firestore security rules levels.

## Changes

### New Files
- `src/types/permissions.ts` - Type definitions for roles and permissions
- `src/hooks/usePermissions.ts` - Custom hook for permission checks

### Modified Files
- `src/providers/dataProvider.firebase.ts` - Extended auth provider to fetch roles from Firestore
- `src/App.tsx` - Always render resources (auth handled by base provider)
- `firestore.rules` - Added RBAC security rules for all collections
- All resource components (`Accounts.tsx`, `Users.tsx`, `Properties.tsx`, etc.) - Added permission checks

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

| Resource | Action | Admin | Manager | Resident | Viewer |
|----------|--------|-------|---------|----------|--------|
| accounts | list | ✓ | ✓ (own) | ✗ | ✗ |
| accounts | create/edit/delete | ✓ | ✗ | ✗ | ✗ |
| users | list | ✓ | ✓ (own account) | ✗ | ✗ |
| users | create/edit/delete | ✓ | ✓ (own account) | ✗ | ✗ |
| properties | list | ✓ | ✓ (own account) | ✓ (own) | ✓ (own account) |
| properties | create/edit | ✓ | ✓ (own account) | ✗ | ✗ |
| residents | list | ✓ | ✓ (own account) | ✓ (own) | ✓ (own account) |
| visitors | create | ✓ | ✓ (own account) | ✓ | ✗ |
| fees | list | ✓ | ✓ (own account) | ✓ (own) | ✗ |

Note: "own account" means resources where `account_id` matches the user's `account_id`.

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

## Additional Notes

- Permissions are checked at both UI component level and Firestore security rules level
- Account scoping is enforced for non-admin users
- Security rules prevent unauthorized data access at the database level
