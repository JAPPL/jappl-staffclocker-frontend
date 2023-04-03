import { it, expect, describe, beforeEach } from 'vitest';
import {
	createSessionCookie,
	getAdminApp,
	getIdTokenFromSessionCookie,
	verifyIdToken
} from './firebaase-admin';

const mockAuth = {
	createSessionCookie: vi.fn(() => 'token'),
	verifySessionCookie: vi.fn(),
	verifyIdToken: vi.fn()
};

describe('Firebase Admin', () => {
	beforeEach(() => {
		vi.mock('firebase-admin/auth', () => ({
			getAuth: vi.fn(() => mockAuth)
		}));
	});

	it('should initialize firebase admin app', () => {
		const app = getAdminApp();
		getAdminApp();
		expect(app).not.toBeUndefined();
	});

	it('should run #verifyIdToken()', async () => {
		vi.spyOn(mockAuth, 'verifyIdToken');
		await verifyIdToken('token');
		expect(mockAuth.verifyIdToken).toHaveBeenCalled();
	});

	it('should run #createSessionCookie()', async () => {
		vi.spyOn(mockAuth, 'createSessionCookie');
		await createSessionCookie('token', 1);
		expect(mockAuth.createSessionCookie).toHaveBeenCalled();
	});

	it('should run #getIdTokenFromSessionCookie() have session cookie', async () => {
		vi.spyOn(mockAuth, 'verifySessionCookie').mockReturnValue(Promise.resolve());
		await getIdTokenFromSessionCookie('session');
		expect(mockAuth.verifySessionCookie).toHaveBeenCalled();
	});

	it('should run #getIdTokenFromSessionCookie() empty session cookie', async () => {
		vi.spyOn(mockAuth, 'verifySessionCookie');
		await getIdTokenFromSessionCookie('');
		expect(mockAuth.verifySessionCookie).not.toHaveBeenCalled();
	});
});
