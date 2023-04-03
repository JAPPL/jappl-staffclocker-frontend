import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
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
			'/api': 'http://127.0.0.1:8000'
		}
	}
});
