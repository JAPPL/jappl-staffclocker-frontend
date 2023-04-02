import { firebaseClientConfig } from '../config/firebase-config';
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import {
	getAuth,
	setPersistence,
	inMemoryPersistence,
	GoogleAuthProvider,
	signInWithPopup,
	type User
} from 'firebase/auth';
import type { Auth as FirebaseAuth } from '@firebase/auth';

export const getClientApp = (): FirebaseApp => {
	if (getApps().length) {
		return getApp();
	}
	const app: FirebaseApp = initializeApp(firebaseClientConfig);
	const auth: FirebaseAuth = getAuth(app);
	setPersistence(auth, inMemoryPersistence);
	return app;
};

export const loginWithGoogle = async (): Promise<User | null> => {
	const auth: FirebaseAuth = getAuth(getClientApp());
	const provider: GoogleAuthProvider = new GoogleAuthProvider();
	provider.setCustomParameters({
		login_hint: 'user@example.com'
	});
	await signInWithPopup(auth, provider);
	return auth.currentUser;
};
