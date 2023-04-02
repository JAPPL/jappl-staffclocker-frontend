import { getApps, getApp, initializeApp, cert, type App } from 'firebase-admin/app';
import { firebaseAdminConfig } from '../config/firebase-admin-config';
import { getAuth, type Auth, type DecodedIdToken } from 'firebase-admin/auth';

export const getAdminApp = (): App => {
	// console.log(firebaseAdminConfig);
	if (getApps().length) {
		return getApp();
	}
	return initializeApp({
		credential: cert(firebaseAdminConfig)
	});
};

export const verifyIdToken = (token: string): Promise<DecodedIdToken> => {
	const auth: Auth = getAuth(getAdminApp());
	return auth.verifyIdToken(token);
};

export const createSessionCookie = async (token: string, maxAge: number): Promise<string> => {
	const expiresIn: number = maxAge * 1000;
	const auth: Auth = getAuth(getAdminApp());
	const sessionCookie: string = await auth.createSessionCookie(token, { expiresIn });
	console.log(sessionCookie);
	return `session=${sessionCookie}; SameSite=Strict; path=/; HttpOnly; Secure; Max-Age=${maxAge}`;
};

export const getIdTokenFromSessionCookie = async (
	sessionCookie: string | null
): Promise<DecodedIdToken | null> => {
	if (!sessionCookie) {
		return null;
	}
	const auth: Auth = getAuth(getAdminApp());
	return await auth.verifySessionCookie(sessionCookie, true).catch(() => null);
};
