import { fireEvent, render, type RenderResult, screen, waitFor } from '@testing-library/svelte';
import ProjectMemberDeleteConfirmation from './ProjectMemberDeleteConfirmation.svelte';
import { beforeEach, describe } from 'vitest';
import type { Project } from '../../../interface/project';
import type { UserStore } from '../../../interface/user-store';
import { setUser } from '../../../store/user.js';
import type { ErrorResponse } from '../../../interface/error-response';
import toast from 'svelte-french-toast';
import type { ProjectMember } from '../../../interface/project-member';
import type { User } from '../../../interface/user';

global.fetch = vi.fn();

const project: Project = { projectId: 1, projectName: 'Test project' };

const user: User = {
	userId: 1,
	firstName: 'Test',
	lastName: 'user',
	email: 'test@test.com'
};

const userStore: UserStore = {
	email: null,
	name: 'Test user',
	picture: '',
	token: ''
};

const projectMember: ProjectMember = {
	projectMemberId: 1,
	project: project,
	user: user,
	isPm: false
};

describe('ProjectDeleteConfirmation', async () => {
	function createFetchResponse(data: Project | ErrorResponse | null, status: number) {
		return {
			json: () => new Promise((resolve) => resolve(data)),
			status: status,
			ok: status == 200
		};
	}

	describe('ProjectDeleteConfirmation without project member information given', async () => {
		beforeEach(async () => {
			render(ProjectMemberDeleteConfirmation, { selectedProjectMemberForDelete: undefined });
		});

		it('should render component', () => {
			expect(screen.getByTestId('mandatory-title-delete')).toBeInTheDocument();
			expect(screen.getByText('Project Member Delete Confirmation')).toBeInTheDocument();
			expect(screen.getByTestId('mandatory-content-delete')).toBeInTheDocument();
			expect(
				screen.getByText('Are you sure to delete user N/A N/A in project N/A?')
			).toBeInTheDocument();
			expect(screen.getByTestId('delete-close-button')).toBeInTheDocument();
			expect(screen.getByTestId('delete-confirm-button')).toBeInTheDocument();
		});
	});

	describe('ProjectDeleteConfirmation with project information given', async () => {
		let component: RenderResult<ProjectMemberDeleteConfirmation>;

		beforeEach(async () => {
			component = render(ProjectMemberDeleteConfirmation, {
				selectedProjectMemberForDelete: projectMember
			});
			setUser(userStore);
		});

		it('should render component', () => {
			expect(screen.getByTestId('mandatory-title-delete')).toBeInTheDocument();
			expect(screen.getByText('Project Member Delete Confirmation')).toBeInTheDocument();
			expect(screen.getByTestId('mandatory-content-delete')).toBeInTheDocument();
			expect(
				screen.getByText(
					`Are you sure to delete user ${user.firstName} ${user.lastName} in project ${project.projectName}?`
				)
			).toBeInTheDocument();
			expect(screen.getByTestId('delete-close-button')).toBeInTheDocument();
			expect(screen.getByTestId('delete-confirm-button')).toBeInTheDocument();
		});

		it('should call delete function when trigger button event', async () => {
			fetch.mockResolvedValue(createFetchResponse(null, 200));
			const mockEventFunction = vi.fn();
			component.component.$on('loadMember', mockEventFunction);
			vi.spyOn(toast, 'success');

			const confirmButton = screen.getByTestId('delete-confirm-button');
			await fireEvent.click(confirmButton);
			expect(fetch).toHaveBeenCalledWith(`api/project-member/delete/${project.projectId}`, {
				method: 'DELETE',
				headers: new Headers({ Authorization: `Bearer ${userStore.token}` })
			});
			await waitFor(() => {
				expect(mockEventFunction).toHaveBeenCalledTimes(1);
				expect(toast.success).toHaveBeenCalledWith(
					`Delete member ${user.firstName} in project ${project.projectName} successfully.`
				);
			});
		});
	});
});
