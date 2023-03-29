import { render, type RenderResult } from '@testing-library/svelte';
import ProjectDialog from './ProjectDialog.svelte';
import { describe } from 'vitest';

describe('ProjectDeleteConfirmation', async () => {
	it('Initialize component', () => {
		const projectDeleteConfirmationRender: RenderResult<ProjectDialog> = render(ProjectDialog);
		expect(projectDeleteConfirmationRender).toBeTruthy();
	});
});
