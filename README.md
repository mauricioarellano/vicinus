# Vicinus

A property management system built with React Admin and Firebase, designed for managing condominiums, residents, visitors, fees, and accounts with role-based access control.

## Features

- **Property Management**: Manage properties, accounts, and residents
- **Visitor Management**: Track visitors and recurrent visitors
- **Fee Management**: Handle fees and fee amounts
- **Role-Based Access Control (RBAC)**: Four roles (admin, manager, resident, viewer) with account-scoped permissions
- **Multi-language Support**: Spanish (es) and French (fr) translations
- **Firebase Integration**: Real-time data with Firestore and Firebase Authentication

## Installation

Install the application dependencies by running:

```sh
npm install
npm install firebase --legacy-peer-deps
```

## Firebase Configuration

This application uses Firebase for authentication and data storage. You need to configure Firebase environment variables.

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Enable Firestore Database
4. Enable Authentication (Email/Password or your preferred method)

### 2. Get Firebase Configuration

1. In Firebase Console, go to Project Settings → General
2. Scroll down to "Your apps" section
3. Click on the web app icon (`</>`) or add a new web app
4. Copy the Firebase configuration object

### 3. Set Environment Variables

Create a `.env` file in the project root with the following variables:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

Replace the values with your actual Firebase configuration.

### 4. Deploy Firestore Security Rules

The project includes Firestore security rules with RBAC implementation. Deploy them to Firebase:

```bash
firebase deploy --only firestore:rules
```

Or manually:

1. Open Firebase Console → Firestore Database → Rules tab
2. Copy and paste the contents of `firestore.rules`
3. Click "Publish"

### 5. Set Up User Documents

For each authenticated user, create a document in the `users` collection in Firestore:

- **Collection**: `users`
- **Document ID**: Firebase Auth UID (same as the user's authentication UID)
- **Required fields**:
  ```json
  {
    "role": "admin",
    "account_id": "optional-account-id",
    "name": "User Name",
    "email": "user@example.com"
  }
  ```

**Available roles:**

- `admin` - Full access across all accounts
- `manager` - Access to assigned account
- `resident` - Limited access to own data
- `viewer` - Read-only access to assigned account

See [FirebaseRBAC.md](./.docs/FirebaseRBAC.md) for detailed RBAC documentation.

## Development

Start the application in development mode by running:

```sh
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in the terminal).

## Production

Build the application in production mode by running:

```sh
npm run build
```

The built files will be in the `dist` directory. You can preview the production build with:

```sh
npm run serve
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run serve` - Preview production build
- `npm run type-check` - Run TypeScript type checking
- `npm run lint` - Lint and fix code issues
- `npm run format` - Format code with Prettier

## Resources

The application includes the following resources:

- **Accounts** - Manage property accounts/condominiums
- **Properties** - Manage individual properties
- **Residents** - Manage resident information
- **Users** - Manage system users
- **Fees** - Manage fee records
- **Fee Amounts** - Manage fee amount configurations
- **Visitors** - Track visitor entries
- **Recurrent Visitors** - Manage recurring visitors
- **Roles** - Manage user roles (admin only)

## Authentication

The application uses Firebase Authentication. Users must:

1. Be authenticated via Firebase Auth
2. Have a corresponding document in the `users` Firestore collection
3. Have a valid role assigned

The authentication provider automatically fetches user roles and permissions from Firestore.

## Role-Based Access Control

The application implements RBAC with account-scoped permissions. Access is controlled at both the UI component level and Firestore security rules level.

For detailed information about permissions and access control, see [FirebaseRBAC.md](./.docs/FirebaseRBAC.md).

## Internationalization

The application supports multiple languages:

- Spanish (es) - Default
- French (fr)
- English (en) - React Admin default

The language is automatically detected from the browser locale.

## Technology Stack

- **React Admin** - Admin framework
- **Firebase** - Backend (Firestore + Authentication)
- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Material-UI** - UI components

## Project Structure

```
src/
├── components/       # Reusable components
├── hooks/           # Custom React hooks
├── i18n/            # Internationalization files
├── providers/       # React Admin providers (auth, data, i18n)
├── resources/       # Resource definitions (CRUD pages)
├── types/           # TypeScript type definitions
└── App.tsx          # Main application component
```
