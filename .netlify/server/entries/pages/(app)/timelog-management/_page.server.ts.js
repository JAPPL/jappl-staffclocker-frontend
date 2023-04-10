import { r as redirect } from '../../../../chunks/index.js';
const load = async ({ locals }) => {
	if (!locals.token) {
		console.log('access deny');
		throw redirect(303, '/login');
	}
};
export { load };
