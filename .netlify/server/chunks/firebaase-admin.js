import { getApps, getApp, initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
const firebaseAdminConfig = {
	type: 'service_account',
	projectId: 'jappl-authentication',
	privateKey:
		'-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCrp2CT0UXHXl7w\nTtTF18+70JVs/3kV8zP/qk7hYkM5Vhh0EP+ZbY+dewjJO8QAiVJMpwU0kOW2/45M\nMgZF1LzvAeJi6Lw4XQU7vvq9osGi9QJMI7W/7H4ztj3EQv/qeeFTbhV/LUD0G6sn\nM7zHZ5lK2cRKmevLXJo0JslY8aS82YX+aePpVzVFeVog/cOBJJeKUM+N7wQg9LYP\no62EVbzinlJmYcbWkpdLGZWSicoiJz8CxfxwEDAqaH+UWHxyevfns/qnA+/eOvZq\n3yXF7WsPbZEl3sEbNHJ5Kcm7GVFF18AJrm/W5XP+Wkg4muER/e7JioDmo4tpJgf/\nwhL1SwZzAgMBAAECggEAJKcm3ilvhvTFvPZ4RI6iku4lGhMrHd7CmbMaCNJcnF+f\n9Ri0G2Tjp7Lf22hhn+OyqR944xKVmo/TKL39zOdyOG7kkk4z8q0aMvnCvL+GLW+3\nv95YLtUm1Y/yfHf6AW1pCdGV0YQuPHG0CDjp9IJQn0UEvxFC4jexzbUChXWDwbcv\nKPMmjlNXcqx8CgDAAqxcuVvY9pEOjcahE++aNUpSLi2l4O4X66tflYhtw6Xewzg/\n3+pp7WUjbTP7vCHeMj9OgPfP+bpbeR0yaARf5i7B6Mz4Qs2d9IZTdK5g60JwasJq\nnByJI4BRzR3zs9qU5viFc+xceosmv1DHfm3lMFazcQKBgQDj8BuDHf0EUa+2d0lD\n6ZtK1IoG7st1we+luo4n4NAgRhPjkz89NlhyLnOttPCyHtT325jKJz1RC/vX/6oc\n2Ot9basKRNvl8x9dHcWUaepZFBDtPUM60xuj+zBCRZH6Mx9l5D+RUdpggJScL5da\nAWQkwQLi6TWmFe05W0w7v1rDVwKBgQDAyV7Qk9n+f5aWVhbOxujprIJu3ap4Ca1P\n8m7KvEgeVxn/6yxTz4K1+vN7tnTddCM091oXeDia82imQvPrZacG2z23iRQ5IBw6\nxkMYgIOP/vfJaiDMKRDeGKsFQI/xqxcWc05bZA02ANTp8bPdFt4gTC7Guz/98I4d\nECW4zXKgRQKBgQCDoObiYvD4C4wjHOOsWj0Zi39h3YiVKjeQRxlMoiDOYmmd5CyC\n1t1gor6es3zD/9YQhDnJk7tvEDKRW80K96GWPzyko3sxYaLdDRJKUJfKdTIJLnWi\nhMLTgX0u6CoSiG87UgH7k38+d0Jap4kJqv//0Y4vJ2mZzdO+aaCuaCSr5QKBgH1F\nHDgaKqeljltHu3BHbecRMnwJy5BOcXCmjnlsGMymOn3B+b7H8x5+36H+sDeKFKqB\nI+hmNRnymoiWrtrB5eOdqJ/PEfYAuHc0hzqvn019FtOpA4DGGnDGxLIX/rDBRLJQ\n4JSgEbmKls8hQIekKVgBSM/XssA2hJG8AVbxIM+lAoGAbyvgNthXEubYw7rzeZq1\npUq+yF5XYCQy01dasfBQpT8Q9tgGVLsL2Jf1u1gN65BRfy2eVgKDuo48HZvmwW8r\ngfdhdiJuehvZN43GmM7GE9EHVIH3PWauMA3lU+a9QtixpPChDujXRIVf4zhpQTYO\nm7oQwKmGNsPjK0AA96jI+jM=\n-----END PRIVATE KEY-----\n',
	clientEmail: 'firebase-adminsdk-42iw7@jappl-authentication.iam.gserviceaccount.com'
};
const getAdminApp = () => {
	if (getApps().length) {
		return getApp();
	}
	return initializeApp({
		credential: cert(firebaseAdminConfig)
	});
};
const verifyIdToken = (token) => {
	const auth = getAuth(getAdminApp());
	return auth.verifyIdToken(token);
};
const createSessionCookie = async (token, maxAge) => {
	const expiresIn = maxAge * 1e3;
	const auth = getAuth(getAdminApp());
	const sessionCookie = await auth.createSessionCookie(token, { expiresIn });
	return `session=${sessionCookie}; SameSite=Strict; path=/; HttpOnly; Secure; Max-Age=${maxAge}`;
};
const getIdTokenFromSessionCookie = async (sessionCookie) => {
	if (!sessionCookie) {
		return null;
	}
	const auth = getAuth(getAdminApp());
	return await auth.verifySessionCookie(sessionCookie, true).catch(() => null);
};
export { createSessionCookie as c, getIdTokenFromSessionCookie as g, verifyIdToken as v };
