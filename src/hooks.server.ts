import type { Handle } from '@sveltejs/kit';
import { getCookieValue, getIdTokenFromSessionCookie } from './lib/firebase/firebaase-admin';

export const handle: Handle = async ({ event, resolve }) => {
	const cookie = event.request.headers.get('cookie');
	event.locals.token = await getIdTokenFromSessionCookie(getCookieValue(cookie));
	return resolve(event);
};
