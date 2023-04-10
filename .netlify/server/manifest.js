export const manifest = {
	appDir: '_app',
	appPath: '_app',
	assets: new Set([
		'favicon.png',
		'google.png',
		'logo-dark.png',
		'logo-without-text.png',
		'logo_notext.png',
		'robots.txt',
		'smui.css',
		'user.png'
	]),
	mimeTypes: { '.png': 'image/png', '.txt': 'text/plain', '.css': 'text/css' },
	_: {
		client: {
			start: {
				file: '_app/immutable/entry/start.9e2f9a23.js',
				imports: [
					'_app/immutable/entry/start.9e2f9a23.js',
					'_app/immutable/chunks/index.0e454169.js',
					'_app/immutable/chunks/singletons.e261c721.js',
					'_app/immutable/chunks/index.a1cff475.js'
				],
				stylesheets: [],
				fonts: []
			},
			app: {
				file: '_app/immutable/entry/app.8fbfea96.js',
				imports: [
					'_app/immutable/entry/app.8fbfea96.js',
					'_app/immutable/chunks/index.0e454169.js'
				],
				stylesheets: [],
				fonts: []
			}
		},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js'),
			() => import('./nodes/3.js'),
			() => import('./nodes/4.js'),
			() => import('./nodes/5.js'),
			() => import('./nodes/6.js'),
			() => import('./nodes/7.js'),
			() => import('./nodes/8.js'),
			() => import('./nodes/9.js')
		],
		routes: [
			{
				id: '/(app)',
				pattern: /^\/?$/,
				params: [],
				page: { layouts: [0, 2], errors: [1, ,], leaf: 4 },
				endpoint: null
			},
			{
				id: '/(authenticate)/auth/session',
				pattern: /^\/auth\/session\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./entries/endpoints/(authenticate)/auth/session/_server.ts.js')
			},
			{
				id: '/(authenticate)/login',
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0, 3], errors: [1, ,], leaf: 9 },
				endpoint: null
			},
			{
				id: '/(app)/member-management',
				pattern: /^\/member-management\/?$/,
				params: [],
				page: { layouts: [0, 2], errors: [1, ,], leaf: 5 },
				endpoint: null
			},
			{
				id: '/(app)/paid-timelog',
				pattern: /^\/paid-timelog\/?$/,
				params: [],
				page: { layouts: [0, 2], errors: [1, ,], leaf: 6 },
				endpoint: null
			},
			{
				id: '/(app)/project-management',
				pattern: /^\/project-management\/?$/,
				params: [],
				page: { layouts: [0, 2], errors: [1, ,], leaf: 7 },
				endpoint: null
			},
			{
				id: '/(app)/timelog-management',
				pattern: /^\/timelog-management\/?$/,
				params: [],
				page: { layouts: [0, 2], errors: [1, ,], leaf: 8 },
				endpoint: null
			}
		],
		matchers: async () => {
			return {};
		}
	}
};
