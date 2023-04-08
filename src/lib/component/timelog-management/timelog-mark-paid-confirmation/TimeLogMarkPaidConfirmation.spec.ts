import { fireEvent, render, type RenderResult, screen, waitFor } from '@testing-library/svelte';
import TimeLogMarkPaidConfirmation from './TimeLogMarkPaidConfirmation.svelte';
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

describe('TimeLogMarkPaidConfirmation', async () => {
	function createFetchResponse(data: TimeLog | ErrorResponse | null, status: number) {
		return {
			json: () => new Promise((resolve) => resolve(data)),
			status: status,
			ok: status == 200
		};
	}

	describe('TimeLogMarkPaidConfirmation without selected timelog', async () => {
		beforeEach(async () => {
			render(TimeLogMarkPaidConfirmation, { selectedTimeLogForMarkPaid: undefined });
		});

		it('should render component', () => {
			expect(screen.getByTestId('mandatory-title-mark-paid')).toBeInTheDocument();
			expect(screen.getByText('TimeLog Mark as Paid Confirmation')).toBeInTheDocument();
			expect(screen.getByTestId('mandatory-content-mark-paid')).toBeInTheDocument();
			expect(screen.getByText('Are you sure to mark this timelog as paid?')).toBeInTheDocument();
			expect(screen.getByTestId('mark-paid-close-button')).toBeInTheDocument();
			expect(screen.getByTestId('mark-paid-confirm-button')).toBeInTheDocument();
		});
	});

	describe('TimeLogMarkPaidConfirmation with timelog information given', async () => {
		let component: RenderResult<TimeLogMarkPaidConfirmation>;

		beforeEach(async () => {
			component = render(TimeLogMarkPaidConfirmation, { selectedTimeLogForMarkPaid: timelog });
			setUser(user);
		});

		it('should render component', () => {
			expect(screen.getByTestId('mandatory-title-mark-paid')).toBeInTheDocument();
			expect(screen.getByText('TimeLog Mark as Paid Confirmation')).toBeInTheDocument();
			expect(screen.getByTestId('mandatory-content-mark-paid')).toBeInTheDocument();
			expect(screen.getByText('Are you sure to mark this timelog as paid?')).toBeInTheDocument();
			expect(screen.getByTestId('mark-paid-close-button')).toBeInTheDocument();
			expect(screen.getByTestId('mark-paid-confirm-button')).toBeInTheDocument();
		});

		it('should call mark_as_paid function when trigger button event', async () => {
			fetch.mockResolvedValue(createFetchResponse(null, 200));
			const mockEventFunction = vi.fn();
			component.component.$on('loadTimeLog', mockEventFunction);
			vi.spyOn(toast, 'success');

			const confirmButton = screen.getByTestId('mark-paid-confirm-button');
			await fireEvent.click(confirmButton);
			expect(fetch).toHaveBeenCalledWith(`api/timelog/mark_as_paid/${timelog.id}`, {
				method: 'PATCH',
				headers: new Headers({ Authorization: `Bearer ${user.token}` })
			});
			await waitFor(() => {
				expect(mockEventFunction).toHaveBeenCalledTimes(1);
				expect(toast.success).toHaveBeenCalledWith(
					`Mark timelog ${timelog.id} as Paid successfully.`
				);
			});
		});
	});
});
