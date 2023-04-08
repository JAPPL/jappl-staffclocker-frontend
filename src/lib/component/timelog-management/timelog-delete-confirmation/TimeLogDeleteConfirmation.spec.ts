import { fireEvent, render, type RenderResult, screen, waitFor } from '@testing-library/svelte';
import TimeLogDeleteConfirmation from './TimeLogDeleteConfirmation.svelte';
import { beforeEach, describe } from 'vitest';
import type { Project } from '../../../interface/project';
import type { TimeLog } from '../../../interface/timelog';
import type { User } from '../../../interface/user';
import type { UserStore } from '../../../interface/user-store';
import { setUser } from '../../../store/user.js';
import type { ErrorResponse } from '../../../interface/error-response';
import toast from 'svelte-french-toast';

global.fetch = vi.fn();

const project: Project = { projectId: 1, projectName: 'Test project' };
const user1: User = { userId: 1, firstName: 'bob', lastName: 'hi' };
const timelog: TimeLog = {
	id: 1,
	projectId: project,
	userId: user1,
	timestamp: '23/03/2023',
	message: 'I did something today',
	hourSpent: 5,
	approved: false,
	paid: false
};

const user: UserStore = {
	email: null,
	name: 'Test user',
	picture: '',
	token: ''
};

describe('TimeLogDeleteConfirmation', async () => {
	function createFetchResponse(data: TimeLog | ErrorResponse | null, status: number) {
		return {
			json: () => new Promise((resolve) => resolve(data)),
			status: status,
			ok: status == 200
		};
	}

	describe('TimeLogDeleteConfirmation without selected timelog', async () => {
		beforeEach(async () => {
			render(TimeLogDeleteConfirmation, { selectedTimeLogForDelete: undefined });
		});

		it('should render component', () => {
			expect(screen.getByTestId('mandatory-title-delete')).toBeInTheDocument();
			expect(screen.getByText('TimeLog Delete Confirmation')).toBeInTheDocument();
			expect(screen.getByTestId('mandatory-content-delete')).toBeInTheDocument();
			expect(screen.getByText('Are you sure to delete this timelog?')).toBeInTheDocument();
			expect(screen.getByTestId('delete-close-button')).toBeInTheDocument();
			expect(screen.getByTestId('delete-confirm-button')).toBeInTheDocument();
		});
	});

	describe('TimeLogDeleteConfirmation with timelog information given', async () => {
		let component: RenderResult<TimeLogDeleteConfirmation>;

		beforeEach(async () => {
			component = render(TimeLogDeleteConfirmation, { selectedTimeLogForDelete: timelog });
			setUser(user);
		});

		it('should render component', () => {
			expect(screen.getByTestId('mandatory-title-delete')).toBeInTheDocument();
			expect(screen.getByText('TimeLog Delete Confirmation')).toBeInTheDocument();
			expect(screen.getByTestId('mandatory-content-delete')).toBeInTheDocument();
			expect(screen.getByText(`Are you sure to delete this timelog?`)).toBeInTheDocument();
			expect(screen.getByTestId('delete-close-button')).toBeInTheDocument();
			expect(screen.getByTestId('delete-confirm-button')).toBeInTheDocument();
		});

		it('should call delete function when trigger button event', async () => {
			fetch.mockResolvedValue(createFetchResponse(null, 200));
			const mockEventFunction = vi.fn();
			component.component.$on('loadTimeLog', mockEventFunction);
			vi.spyOn(toast, 'success');

			const confirmButton = screen.getByTestId('delete-confirm-button');
			await fireEvent.click(confirmButton);
			expect(fetch).toHaveBeenCalledWith(`api/timelog/delete/${timelog.id}`, {
				method: 'DELETE',
				headers: new Headers({ Authorization: `Bearer ${user.token}` })
			});
			await waitFor(() => {
				expect(mockEventFunction).toHaveBeenCalledTimes(1);
				expect(toast.success).toHaveBeenCalledWith(`Delete timelog ${timelog.id} successfully.`);
			});
		});
	});
});
