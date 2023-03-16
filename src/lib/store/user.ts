import { derived, type Readable, writable, type Writable } from 'svelte/store';
import type { DecodedIdToken } from 'firebase-admin/lib/auth';

export const locals: Writable<App.Locals> = writable<App.Locals>();

export const user: Readable<DecodedIdToken | null> = derived<
	Writable<App.Locals>,
	DecodedIdToken | null
>(locals, ($locals, set) => {
	set($locals.token);
});

export const setUser = (user: DecodedIdToken | null): void => {
	locals.update(($locals) => ({ ...$locals, token: user }));
};
