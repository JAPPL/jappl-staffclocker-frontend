import { writable } from 'svelte/store';
import type { AuthStore } from '../interfaces/auth-store';

const authStore = writable<AuthStore>({
	isLoggedIn: false,
	firebaseControlled: false
});

export default {
	subscribe: authStore.subscribe,
	set: authStore.set
};
