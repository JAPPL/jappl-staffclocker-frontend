import { render, type RenderResult } from '@testing-library/svelte';
import ProjectDialog from './ProjectDialog.svelte';
import { describe } from 'vitest';

describe('ProjectDeleteConfirmation', async () => {
	it('should render create project dialog', () => {
		const projectDeleteConfirmationRender: RenderResult<ProjectDialog> = render(ProjectDialog);
		expect(projectDeleteConfirmationRender.getByText('Create project')).toBeInTheDocument();
	});

	it('should render edit project dialog', () => {
		const props = {
			isEdit: true
		};
		const projectDeleteConfirmationRender: RenderResult<ProjectDialog> = render(ProjectDialog, {
			...props
		});
		expect(projectDeleteConfirmationRender.getByText('Edit project')).toBeInTheDocument();
	});
});
