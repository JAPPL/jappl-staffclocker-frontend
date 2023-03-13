import {
	type Auth as FirebaseAuth,
	getAuth,
	GoogleAuthProvider,
	signInWithRedirect,
	onAuthStateChanged,
	signOut
} from 'firebase/auth';
import { initializeApp, type FirebaseApp } from 'firebase/app';
import authStore from '../../store/auth-store';
import { goto } from '$app/navigation';
import firebaseConfig from '../../config/firebase-config.json';

class FirebaseAuthentication {
	private app?: FirebaseApp;
	private auth?: FirebaseAuth;

	public async initApp() {
		this.app = initializeApp(firebaseConfig);
		this.auth = getAuth(this.app);

		onAuthStateChanged(this.auth, async (user) => {
			authStore.set({
				isLoggedIn: user !== null,
				user,
				firebaseControlled: true
			});
		});

		authStore.subscribe(async ({ isLoggedIn, firebaseControlled }) => {
			if (!isLoggedIn && firebaseControlled) {
				await goto('/login');
			}
		});
	}

	public getToken(): Promise<string | null> {
		const currentUser = this.auth?.currentUser;
		if (currentUser) {
			return currentUser.getIdToken();
		}
		return Promise.resolve(null);
	}

	public async loginWithGoogle(): Promise<void> {
		try {
			const provider = new GoogleAuthProvider();
			provider.setCustomParameters({
				login_hint: 'user@example.com'
			});
			if (!this.auth) {
				this.initApp();
			}
			await signInWithRedirect(this.auth!, provider);
		} catch (e) {
			console.log(e);
		}
	}

	public async signOut(): Promise<void> {
		await signOut(this.auth as FirebaseAuth);
	}
}

export const firebaseAuth: FirebaseAuthentication = new FirebaseAuthentication();
