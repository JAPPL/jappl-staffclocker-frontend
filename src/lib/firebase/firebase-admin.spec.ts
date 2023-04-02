import { it, expect, describe, beforeEach } from 'vitest';
import { getAdminApp } from './firebaase-admin';
import type { App } from 'firebase-admin/app';

describe('Firebase Admin', () => {
	let app: App;

	beforeEach(() => {
		app = getAdminApp();
	});

	it('should initialize firebase admin app', () => {
		expect(app).not.toBeUndefined();
	});
});
