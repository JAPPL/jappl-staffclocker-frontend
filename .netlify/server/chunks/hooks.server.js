import { g as getIdTokenFromSessionCookie } from './firebaase-admin.js';
const handle = async ({ event, resolve }) => {
	const cookie = event.cookies.get('session') || null;
	event.locals.token = await getIdTokenFromSessionCookie(cookie);
	return resolve(event);
};
export { handle };
