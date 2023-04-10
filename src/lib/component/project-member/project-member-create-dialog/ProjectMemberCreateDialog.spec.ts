import { fireEvent, render, screen, waitFor } from '@testing-library/svelte';
import ProjectMemberCreateDialog from './ProjectMemberCreateDialog.svelte';
import { beforeEach, describe } from 'vitest';
import type { Project } from '../../../interface/project';
import type { UserStore } from '../../../interface/user-store';
import type { ProjectMember } from '../../../interface/project-member';
import type { User } from '../../../interface/user';
import { setUser } from '../../../store/user';

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
	beforeEach(async () => {
		render(ProjectMemberCreateDialog, {
			allUsers: [user],
			allProjects: [project],
			allProjectMembers: [projectMember],
			openCreateDialog: true
		});
		setUser(userStore);
	});

	it('should render component', () => {
		expect(screen.getByTestId('mandatory-create-title')).toBeInTheDocument();
		expect(screen.getByText('Add project member')).toBeInTheDocument();
		expect(screen.getByTestId('mandatory-content')).toBeInTheDocument();
		expect(screen.getByTestId('project-selector')).toBeInTheDocument();
		expect(screen.getByTestId('user-selector')).toBeInTheDocument();
		expect(screen.getByTestId('close-button')).toBeInTheDocument();
		expect(screen.getByTestId('user-selector')).toHaveClass('mdc-select--disabled');
		expect(screen.getByTestId('confirm-button')).toBeInTheDocument();
	});

	it('should enable user selector', async () => {
		const projectSelector = screen.getByTestId('project-selector');
		const projectOption = screen.getByTestId(project.projectName);
		await fireEvent.click(projectSelector);
		await fireEvent.click(projectOption);
		await waitFor(() => {
			expect(screen.getByTestId('project-selector')).not.toHaveClass('mdc-select--invalid');
		});
	});

	it('should not add project member', async () => {
		const confirmButton = screen.getByTestId('confirm-button');
		await fireEvent.click(confirmButton);
		await waitFor(() => {
			expect(fetch).not.toHaveBeenCalled();
		});
	});
});
