import {
	type Auth as FirebaseAuth,
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	onAuthStateChanged
} from 'firebase/auth';
import { initializeApp, type FirebaseApp } from 'firebase/app';
import type { FirebaseConfig } from '../../interfaces/firebase-config';
import authStore from '../../store/auth-store';
import { goto } from '$app/navigation';

export class FirebaseAuthentication {
	private app?: FirebaseApp;
	private auth?: FirebaseAuth;
	private firebaseConfig: FirebaseConfig = {
		apiKey: 'AIzaSyCphoxGbZ4Ts-YCDH54Zhl6no2FjTTyTyI',
		authDomain: 'jappl-authentication.firebaseapp.com',
		projectId: 'jappl-authentication',
		storageBucket: 'jappl-authentication.appspot.com',
		messagingSenderId: '803380547350',
		appId: '1:803380547350:web:0899b5dbfb13c897dd0a37',
		measurementId: 'G-PEWBXPDLJT'
	};

	public initApp() {
		this.app = initializeApp(this.firebaseConfig);
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

	public getAuthApp(): FirebaseAuth {
		return this.auth as FirebaseAuth;
	}

	public getApp(): FirebaseApp {
		return this.app as FirebaseApp;
	}

	public getToken(): Promise<string | null> {
		const currentUser = this.auth?.currentUser;
		if (currentUser) {
			return currentUser.getIdToken();
		}
		return Promise.resolve(null);
	}

	public async loginWithGoogle() {
		try {
			const provider = new GoogleAuthProvider();
			provider.setCustomParameters({
				login_hint: 'user@example.com'
			});
			if (!this.auth) {
				this.initApp();
			}
			await signInWithPopup(this.auth!, provider);
		} catch (e) {
			console.log(e);
		}
	}
}
