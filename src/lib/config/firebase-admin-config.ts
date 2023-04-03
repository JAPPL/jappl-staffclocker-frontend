if (
	!import.meta.env.VITE_FIREBASE_ADMIN_TYPE ||
	!import.meta.env.VITE_FIREBASE_ADMIN_PROJECTID ||
	!import.meta.env.VITE_FIREBASE_ADMIN_PRIVATE_KEY ||
	!import.meta.env.VITE_FIREBASE_ADMIN_EMAIL
) {
	throw new Error('Firebase admin config environment variables not given');
}

console.log('test ', import.meta.env.VITE_FIREBASE_ADMIN_PRIVATE_KEY);

export const firebaseAdminConfig = {
	type: import.meta.env.VITE_FIREBASE_ADMIN_TYPE,
	projectId: import.meta.env.VITE_FIREBASE_ADMIN_PROJECTID,
	privateKey: import.meta.env.VITE_FIREBASE_ADMIN_PRIVATE_KEY,
	clientEmail: import.meta.env.VITE_FIREBASE_ADMIN_EMAIL
};
