import { render, type RenderResult } from '@testing-library/svelte';
import ProjectDeleteConfirmation from './ProjectDeleteConfirmation.svelte';
import { describe } from 'vitest';

describe('ProjectDeleteConfirmation', async () => {
	it('Initialize component', () => {
		const projectDeleteConfirmationRender: RenderResult<ProjectDeleteConfirmation> =
			render(ProjectDeleteConfirmation);
		expect(projectDeleteConfirmationRender).toBeTruthy();
	});
});
