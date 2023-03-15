import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const cookie = event.request.headers.get('cookie');
	console.log(cookie);
	const response = await resolve(event);
	return response;
};
