import { it, expect, describe } from 'vitest';
import { getClientApp } from './firebase-client';
import type { FirebaseApp } from 'firebase/app';
import { signInWithPopup, type User, type UserCredential, type IdTokenResult } from 'firebase/auth';

const user: User = {
	displayName: 'Test user',
	email: 'test@email.com',
	emailVerified: false,
	isAnonymous: false,
	metadata: {},
	phoneNumber: '08123454567',
	photoURL: '',
	providerData: [],
	providerId: '',
	refreshToken: '',
	tenantId: '',
	uid: '',
	delete(): Promise<void> {
		return Promise.resolve(undefined);
	},
	getIdToken(_forceRefresh?: boolean): Promise<string> {
		return Promise.resolve(String(_forceRefresh));
	},
	getIdTokenResult(_forceRefresh?: boolean): Promise<IdTokenResult> {
		const result: IdTokenResult = {
			authTime: '',
			claims: {},
			expirationTime: '',
			issuedAtTime: '',
			signInProvider: '',
			signInSecondFactor: null,
			token: String(_forceRefresh)
		};
		return Promise.resolve(result);
	},
	reload(): Promise<void> {
		return Promise.resolve(undefined);
	},
	toJSON(): object {
		return {};
	}
};

const userCredential: UserCredential = { operationType: 'link', providerId: 'some id', user: user };

describe('Firebase Client', () => {
	const mockFunction = {
		signIn: signInWithPopup
	};

	it('should initialize firebase client app', () => {
		const app: FirebaseApp = getClientApp();
		getClientApp();
		expect(app).not.toBeUndefined();
	});
});
