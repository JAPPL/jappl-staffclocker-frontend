import type { Handle } from '@sveltejs/kit';
import { getIdTokenFromSessionCookie } from './lib/firebase/firebaase-admin';

export const handle: Handle = async ({ event, resolve }) => {
	const cookie: string | null = event.cookies.get('session') || null;
	event.locals.token = await getIdTokenFromSessionCookie(cookie);
	return resolve(event);
};
