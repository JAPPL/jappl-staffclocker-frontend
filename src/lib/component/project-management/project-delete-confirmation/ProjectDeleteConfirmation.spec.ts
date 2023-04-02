import { fireEvent, render, type RenderResult, screen, waitFor } from '@testing-library/svelte';
import ProjectDeleteConfirmation from './ProjectDeleteConfirmation.svelte';
import { beforeEach, describe } from 'vitest';
import type { Project } from '../../../interface/project';
import type { UserStore } from '../../../interface/user-store';
import { setUser } from '../../../store/user.js';
import type { ErrorResponse } from '../../../interface/error-response';
import toast from 'svelte-french-toast';

global.fetch = vi.fn();

const project: Project = { projectId: 1, projectName: 'Test project' };

const user: UserStore = {
	email: null,
	name: 'Test user',
	picture: '',
	token: ''
};

describe('ProjectDeleteConfirmation', async () => {
	function createFetchResponse(data: Project | ErrorResponse | null, status: number) {
		return {
			json: () => new Promise((resolve) => resolve(data)),
			status: status,
			ok: status == 200
		};
	}

	describe('ProjectDeleteConfirmation with project information given', async () => {
		beforeEach(async () => {
			render(ProjectDeleteConfirmation, { selectedProjectForDelete: null });
		});

		it('should render component', () => {
			expect(screen.getByTestId('mandatory-title-delete')).toBeInTheDocument();
			expect(screen.getByText('Project Delete Confirmation')).toBeInTheDocument();
			expect(screen.getByTestId('mandatory-content-delete')).toBeInTheDocument();
			expect(screen.getByText('Are you sure to delete project N/A?')).toBeInTheDocument();
			expect(screen.getByTestId('delete-close-button')).toBeInTheDocument();
			expect(screen.getByTestId('delete-confirm-button')).toBeInTheDocument();
		});
	});

	describe('ProjectDeleteConfirmation with project information given', async () => {
		let component: RenderResult<ProjectDeleteConfirmation>;

		beforeEach(async () => {
			component = render(ProjectDeleteConfirmation, { selectedProjectForDelete: project });
			setUser(user);
		});

		it('should render component', () => {
			expect(screen.getByTestId('mandatory-title-delete')).toBeInTheDocument();
			expect(screen.getByText('Project Delete Confirmation')).toBeInTheDocument();
			expect(screen.getByTestId('mandatory-content-delete')).toBeInTheDocument();
			expect(
				screen.getByText(`Are you sure to delete project ${project.projectName}?`)
			).toBeInTheDocument();
			expect(screen.getByTestId('delete-close-button')).toBeInTheDocument();
			expect(screen.getByTestId('delete-confirm-button')).toBeInTheDocument();
		});

		it('should call delete function when trigger button event', async () => {
			fetch.mockResolvedValue(createFetchResponse(null, 200));
			const mockEventFunction = vi.fn();
			component.component.$on('loadProject', mockEventFunction);
			vi.spyOn(toast, 'success');

			const confirmButton = screen.getByTestId('delete-confirm-button');
			await fireEvent.click(confirmButton);
			expect(fetch).toHaveBeenCalledWith(`api/project/delete/${project.projectId}`, {
				method: 'DELETE',
				headers: new Headers({ Authorization: `Bearer ${user.token}` })
			});
			await waitFor(() => {
				expect(mockEventFunction).toHaveBeenCalledTimes(1);
				expect(toast.success).toHaveBeenCalledWith(
					`Delete project ${project.projectName} successfully.`
				);
			});
		});
	});
});
