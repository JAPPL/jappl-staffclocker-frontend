import { createSessionCookie, verifyIdToken } from '../../../lib/firebase/firebaase-admin';
import type { RequestHandler } from '@sveltejs/kit';

const ONE_WEEK_IN_SECOND: number = 60 * 60 * 24 * 7;

export const POST: RequestHandler = async ({ request }) => {
	const authHeader: string = request.headers.get('Authorization') || '';
	const [scheme, token] = authHeader.split(' ');
	if (scheme !== 'Bearer' || !token) {
		return new Response(JSON.stringify({ detail: 'invalid auth header' }), { status: 401 });
	}
	try {
		const { sub, email } = await verifyIdToken(token);
		const user = { id: sub, email };
		const sessionCookie: string = await createSessionCookie(token, ONE_WEEK_IN_SECOND);
		return new Response(JSON.stringify(user), {
			status: 200,
			headers: { 'Set-Cookie': sessionCookie }
		});
	} catch {
		return new Response(JSON.stringify({ detail: 'invalid auth token' }), { status: 401 });
	}
};
