import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
	const env: Record<string, string> = loadEnv(mode, process.cwd());

	return {
		plugins: [sveltekit()],
		test: {
			globals: true,
			environment: 'jsdom',
			setupFiles: ['./setupTest.js'],
			include: ['src/**/*.{timelog,spec}.{js,ts}'],
			coverage: {
				provider: 'c8',
				exclude: ['src/**/*-config.ts', 'src/**/*.{timelog,spec}.{js,ts}'],
				reporter: ['lcov', 'text']
			},
			deps: {
				inline: [`@sveltejs/kit`]
			}
		},
		server: {
			proxy: {
				'/api': env?.VITE_APP_BACKEND ? env.VITE_APP_BACKEND : 'http://127.0.0.1:8000'
			}
		}
	};
});
