[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=JAPPL_jappl-staffclocker-frontend&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=JAPPL_jappl-staffclocker-frontend)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=JAPPL_jappl-staffclocker-frontend&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=JAPPL_jappl-staffclocker-frontend)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=JAPPL_jappl-staffclocker-frontend&metric=coverage)](https://sonarcloud.io/summary/new_code?id=JAPPL_jappl-staffclocker-frontend)

## JAPPL StaffClocker Frontend

**Description:** Mini Hr service for recording employee working hour.

Preview site on production: https://deluxe-gnome-1d4340.netlify.app/

### Main features

1. User is able to log activity and hour spent on project
2. User can view time log history
3. User can mark status (approve, paid) for time log
4. User can create new project and assign member for recording time log
5. User can edit/delete time log before it is approved
6. User can edit/delete project and project member

### Pages

1. Dashboard (/): contain log out, create time log card component and time log history table (display only non-approved and approved time log)
2. Paid time log (/paid-timelog): display time log history table (only paid time log)
3. Time log management (/timelog-management): display all time log from all users and be able to change status
4. Project management (/project-management): the page for creating new project and edit/delete existing project
5. Project member management (/member-management): the page to assign user to existing project
6. login (/login): login with google account only

### Technological stacks

1. Svelte: main framework
2. Firebase authentication: for login process with session cookie
3. SMUI: UI library

## Steps set up project in local machine

1. clone this repository
2. go to the cloned repository in your machine and run `npm intall`
3. Set up Firebase authentication (go to link https://firebase.google.com/ and select authentication)
4. Once you are done with step 2, create `.env` file in root directory
5. Set up backend (go to https://github.com/JAPPL/jappl-staffclocker-backend)
6. To run project, `npm run dev`

### Setting environment variable

In step 4, the list of environment variables can be found under `env.d.ts`

**Required variables**

To generate firebase admin config of your firebase application, In the Firebase console, open Settings > Service Accounts.

```dotenv
VITE_FIREBASE_ADMIN_TYPE: Your firebase admin service type from generated config file
VITE_FIREBASE_ADMIN_PROJECTID: Firebase project ID
VITE_FIREBASE_ADMIN_PRIVATE_KEY: Firebase admin private key (from firebase admin config)
VITE_FIREBASE_ADMIN_EMAIL: Firebase admin email from service account
VITE_FIREBASE_CLIENT_APIKEY: Firebase client API key
VITE_FIREBASE_CLIENT_AUTHDOMAIN: Your Firebase application domain
VITE_FIREBASE_CLIENT_PROJECTID: Your project ID
VITE_FIREBASE_CLIENT_STORAGEBUCKET: Firebase client storage bucket (found in firebase client config)
VITE_FIREBASE_CLIENT_MESSAGINGSENDERID= Message sender ID
VITE_FIREBASE_CLIENT_APPID: Firebase client application ID
VITE_FIREBASE_CLIENT_MEASUREMENTID: Firebase measurement ID
```

Optional variables

```dotenv
VITE_APP_BACKEND: Your backend url in production (default: localhost:8000)
```

## Testing and Coverage

To run test, the command to run is

```
npm run test:unit
```

To run test with report UI,

```
npm run test:ui
```

To run coverage test,

```
npm run coverage
```

the coverage file is under `coverage` directory in project root.

## Linting/Formatting

If husky pre-commit fails due to linting, use:

```bash
npm run format && git add .
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to change an [adapter](https://kit.svelte.dev/docs/adapters) under `vite.config.ts` to suit your production preference.
