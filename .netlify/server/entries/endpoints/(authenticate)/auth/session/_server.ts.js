import {
	v as verifyIdToken,
	c as createSessionCookie
} from '../../../../../chunks/firebaase-admin.js';
const ONE_WEEK_IN_SECOND = 60 * 60 * 24 * 7;
const POST = async ({ request }) => {
	const authHeader = request.headers.get('Authorization') || '';
	const [scheme, token] = authHeader.split(' ');
	if (scheme !== 'Bearer' || !token) {
		return new Response(JSON.stringify({ detail: 'Invalid authorization header.' }), {
			status: 401
		});
	}
	try {
		const user = await verifyIdToken(token);
		const sessionCookie = await createSessionCookie(token, ONE_WEEK_IN_SECOND);
		return new Response(JSON.stringify(user), {
			status: 200,
			headers: { 'Set-Cookie': sessionCookie }
		});
	} catch {
		return new Response(JSON.stringify({ detail: 'Fail to set session cookie.' }), {
			status: 401
		});
	}
};
export { POST };
