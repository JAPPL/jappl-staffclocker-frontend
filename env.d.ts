interface ImportMetaEnv {
	readonly VITE_FIREBASE_ADMIN_TYPE: string;
	readonly VITE_FIREBASE_ADMIN_PROJECTID: string;
	readonly VITE_FIREBASE_ADMIN_PRIVATE_KEY: string;
	readonly VITE_FIREBASE_ADMIN_EMAIL: string;
	readonly VITE_FIREBASE_CLIENT_APIKEY: string;
	readonly VITE_FIREBASE_CLIENT_AUTHDOMAIN: string;
	readonly VITE_FIREBASE_CLIENT_PROJECTID: string;
	readonly VITE_FIREBASE_CLIENT_STORAGEBUCKET: string;
	readonly VITE_FIREBASE_CLIENT_MESSAGINGSENDERID: string;
	readonly VITE_FIREBASE_CLIENT_APPID: string;
	readonly VITE_FIREBASE_CLIENT_MEASUREMENTID: string;
	readonly VITE_APP_BACKEND: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
