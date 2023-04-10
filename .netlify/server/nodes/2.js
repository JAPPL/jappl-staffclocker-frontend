import * as server from '../entries/pages/(app)/_layout.server.ts.js';

export const index = 2;
export const component = async () =>
	(await import('../entries/pages/(app)/_layout.svelte.js')).default;
export const file = '_app/immutable/entry/(app)-layout.svelte.f809db5b.js';
export { server };
export const server_id = 'src/routes/(app)/+layout.server.ts';
export const imports = [
	'_app/immutable/entry/(app)-layout.svelte.f809db5b.js',
	'_app/immutable/chunks/index.0e454169.js',
	'_app/immutable/chunks/Toaster.svelte_svelte_type_style_lang.d7531274.js',
	'_app/immutable/chunks/index.a1cff475.js',
	'_app/immutable/chunks/Toaster.0a8bee9a.js',
	'_app/immutable/chunks/Ripple.442b8ec1.js',
	'_app/immutable/chunks/focus-trap.889a656a.js',
	'_app/immutable/chunks/util.d0e051f0.js',
	'_app/immutable/chunks/Subheader.9b47a595.js',
	'_app/immutable/chunks/mdi.ebae4bb9.js',
	'_app/immutable/chunks/navigation.a7438222.js',
	'_app/immutable/chunks/singletons.e261c721.js'
];
export const stylesheets = [
	'_app/immutable/assets/_layout.a9f44db3.css',
	'_app/immutable/assets/Toaster.3a6d0da3.css',
	'_app/immutable/assets/mdi.9e5a7a09.css'
];
export const fonts = [];
