import { it, expect, describe, beforeEach } from 'vitest';
import { getClientApp, loginWithGoogle } from './firebase-client';
import type { FirebaseApp } from 'firebase/app';
import type { User, UserCredential, IdTokenResult } from 'firebase/auth';

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

const mockAuth = {
	signInWithPopup: vi.fn().mockResolvedValue({ user: userCredential }),
	currentUser: userCredential
};
describe('Firebase Client', () => {
	beforeEach(async () => {
		vi.mock('firebase/auth', () => ({
			getAuth: vi.fn(() => mockAuth),
			onAuthStateChanged: vi.fn(),
			setPersistence: vi.fn(() => Promise.resolve()),
			inMemoryPersistence: vi.fn(() => Promise.resolve()),
			signInWithPopup: vi.fn(),
			GoogleAuthProvider: vi.fn()
		}));
	});

	it('should initialize firebase client app', () => {
		const app: FirebaseApp = getClientApp();
		getClientApp();
		expect(app).not.toBeUndefined();
	});

	it('should run #loginWithGoogle', async () => {
		const result = await loginWithGoogle();
		expect(result).toEqual(userCredential);
	});
});
