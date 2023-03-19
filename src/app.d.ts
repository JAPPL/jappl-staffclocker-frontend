// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { DecodedIdToken } from 'firebase-admin/auth';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			token: DecodedIdToken | null;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
