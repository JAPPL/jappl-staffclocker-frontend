import { fireEvent, render, type RenderResult, screen, waitFor } from '@testing-library/svelte';
import TimeLogApproveConfirmation from './TimeLogApproveConfirmation.svelte';
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

describe('TimeLogApproveConfirmation', async () => {
	function createFetchResponse(data: TimeLog | ErrorResponse | null, status: number) {
		return {
			json: () => new Promise((resolve) => resolve(data)),
			status: status,
			ok: status == 200
		};
	}

	describe('TimeLogApproveConfirmation without selected timelog', async () => {
		beforeEach(async () => {
			render(TimeLogApproveConfirmation, { selectedTimeLogForApprove: undefined });
		});

		it('should render component', () => {
			expect(screen.getByTestId('mandatory-title-approve')).toBeInTheDocument();
			expect(screen.getByText('TimeLog Approve Confirmation')).toBeInTheDocument();
			expect(screen.getByTestId('mandatory-content-approve')).toBeInTheDocument();
			expect(screen.getByText('Are you sure to approve this timelog?')).toBeInTheDocument();
			expect(screen.getByTestId('approve-close-button')).toBeInTheDocument();
			expect(screen.getByTestId('approve-confirm-button')).toBeInTheDocument();
		});
	});

	describe('TimeLogApproveConfirmation with timelog information given', async () => {
		let component: RenderResult<TimeLogApproveConfirmation>;

		beforeEach(async () => {
			component = render(TimeLogApproveConfirmation, { selectedTimeLogForApprove: timelog });
			setUser(user);
		});

		it('should render component', () => {
			expect(screen.getByTestId('mandatory-title-approve')).toBeInTheDocument();
			expect(screen.getByText('TimeLog Approve Confirmation')).toBeInTheDocument();
			expect(screen.getByTestId('mandatory-content-approve')).toBeInTheDocument();
			expect(screen.getByText('Are you sure to approve this timelog?')).toBeInTheDocument();
			expect(screen.getByTestId('approve-close-button')).toBeInTheDocument();
			expect(screen.getByTestId('approve-confirm-button')).toBeInTheDocument();
		});

		it('should call approve function when trigger button event', async () => {
			fetch.mockResolvedValue(createFetchResponse(null, 200));
			const mockEventFunction = vi.fn();
			component.component.$on('loadTimeLog', mockEventFunction);
			vi.spyOn(toast, 'success');

			const confirmButton = screen.getByTestId('approve-confirm-button');
			await fireEvent.click(confirmButton);
			expect(fetch).toHaveBeenCalledWith(`api/timelog/approve/${timelog.id}`, {
				method: 'PATCH',
				headers: new Headers({ Authorization: `Bearer ${user.token}` })
			});
			await waitFor(() => {
				expect(mockEventFunction).toHaveBeenCalledTimes(1);
				expect(toast.success).toHaveBeenCalledWith(`Approved timelog ${timelog.id} successfully.`);
			});
		});
	});
});
