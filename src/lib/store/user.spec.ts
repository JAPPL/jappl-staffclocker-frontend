import { it, expect, describe } from 'vitest';
import { userStore, setUser } from './user';
import type { UserStore } from '../interface/user-store';

const user: UserStore = { email: 'test@gamil.com', name: 'Test user', picture: '', token: '' };

describe('User Store', () => {
	it('should run #setUser()', () => {
		setUser(user);
		userStore.subscribe((userData: UserStore) => {
			expect(userData.token).toEqual(user.token);
			expect(userData.picture).toEqual(user.picture);
			expect(userData.email).toEqual(user.email);
			expect(userData.name).toEqual(userData.name);
		});
	});
});
