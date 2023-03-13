import type { User } from 'firebase/auth';

export interface AuthStore {
	isLoggedIn: boolean;
	user: User | null;
	firebaseControlled: boolean;
}
