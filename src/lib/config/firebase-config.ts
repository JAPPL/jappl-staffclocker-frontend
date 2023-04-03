if (
	!import.meta.env.VITE_FIREBASE_CLIENT_APIKEY ||
	!import.meta.env.VITE_FIREBASE_CLIENT_AUTHDOMAIN ||
	!import.meta.env.VITE_FIREBASE_CLIENT_PROJECTID ||
	!import.meta.env.VITE_FIREBASE_CLIENT_STORAGEBUCKET ||
	!import.meta.env.VITE_FIREBASE_CLIENT_MESSAGINGSENDERID ||
	!import.meta.env.VITE_FIREBASE_CLIENT_APPID ||
	!import.meta.env.VITE_FIREBASE_CLIENT_MEASUREMENTID
) {
	throw new Error('Firebase client config environment variables not given');
}

export const firebaseClientConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_CLIENT_APIKEY,
	authDomain: import.meta.env.VITE_FIREBASE_CLIENT_AUTHDOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_CLIENT_PROJECTID,
	storageBucket: import.meta.env.VITE_FIREBASE_CLIENT_STORAGEBUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_CLIENT_MESSAGINGSENDERID,
	appId: import.meta.env.VITE_FIREBASE_CLIENT_APPID,
	measurementId: import.meta.env.VITE_FIREBASE_CLIENT_MEASUREMENTID
};
