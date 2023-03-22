import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	// redirect user if not logged in
	if (!locals.token) {
		console.log('access deny');
		throw redirect(303, '/login');
	}
};
