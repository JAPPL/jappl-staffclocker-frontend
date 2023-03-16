import type { Writable } from 'svelte/store';
import type { UserStore } from '../interface/user-store';
import { browser } from '$app/environment';
import { persisted } from 'svelte-local-storage-store';

export const userStore: Writable<UserStore> = persisted<UserStore>(
	'user',
	browser
		? JSON.parse(localStorage.getItem('user') || '{}')
		: {
				name: null,
				email: null,
				picture: null
		  }
);

export const setUser = (userValue: UserStore): void => {
	localStorage.setItem('user', JSON.stringify(userValue));
	userStore.update(($userStore) => ({ ...$userStore, ...userValue }));
};
