import { getApps, getApp, initializeApp, cert, type App } from 'firebase-admin/app';
import serviceAccount from '../config/firebase-admin-config.json';
import { getAuth, type Auth, type DecodedIdToken } from 'firebase-admin/auth';

export const getAdminApp = (): App => {
	if (getApps().length) {
		return getApp();
	}
	return initializeApp({
		credential: cert(serviceAccount)
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
	return `session=${sessionCookie}; SameSite=Strict; path=/; HttpOnly; Secure; Max-Age=${maxAge}`;
};

export const getCookieValue = (cookie: string | null): string | null => {
	if (!cookie) {
		return null;
	}
	const [session, cookieValue] = cookie.split('=');
	if (session !== 'session' || !cookieValue) {
		return null;
	}
	return cookieValue;
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
