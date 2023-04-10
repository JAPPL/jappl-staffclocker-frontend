import { render, screen } from '@testing-library/svelte';
import ProjectDialog from './ProjectDialog.svelte';
import { beforeEach, describe } from 'vitest';
import type { Project } from '../../../interface/project';
import type { ErrorResponse } from '../../../interface/error-response';

global.fetch = vi.fn();

describe('ProjectDialog', async () => {
	describe('Create mode', async () => {
		beforeEach(() => {
			render(ProjectDialog);
		});

		it('should render create project dialog', () => {
			expect(screen.getByText('Create project')).toBeInTheDocument();
			expect(screen.getByTestId('load-bar')).toBeInTheDocument();
			expect(screen.getByTestId('project-field')).toBeInTheDocument();
			expect(screen.getByTestId('close-button')).toBeInTheDocument();
			expect(screen.getByTestId('confirm-button')).toBeInTheDocument();
		});
	});

	describe('Edit mode', async () => {
		beforeEach(() => {
			const props = {
				isEdit: true
			};
			render(ProjectDialog, { ...props });
		});

		it('should render edit project dialog', () => {
			expect(screen.getByText('Edit project')).toBeInTheDocument();
			expect(screen.getByTestId('load-bar')).toBeInTheDocument();
			expect(screen.getByTestId('project-field')).toBeInTheDocument();
			expect(screen.getByTestId('close-button')).toBeInTheDocument();
			expect(screen.getByTestId('confirm-button')).toBeInTheDocument();
		});
	});
});
