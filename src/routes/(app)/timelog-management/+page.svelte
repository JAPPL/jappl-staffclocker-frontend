<script lang="ts">
	import { userStore } from '../../../lib/store/user.js';
	import Select, { Option } from '@smui/select';
	import type { ErrorResponse } from '../../../lib/interface/error-response';
	import DataTable, { Head, Body, Row, Cell, Label, SortValue } from '@smui/data-table';
	import { onMount } from 'svelte';
	import toast from 'svelte-french-toast';
	import type { TimeLog } from '../../../lib/interface/timelog';
	import type { Project } from '../../../lib/interface/project';
	import type { User } from '../../../lib/interface/user';
	import TimeLogDeleteConfirmation from '$lib/component/timelog-management/timelog-delete-confirmation/TimeLogDeleteConfirmation.svelte';
	import TimeLogApproveConfirmation from '$lib/component/timelog-management/timelog-approve-confirmation/TimeLogApproveConfirmation.svelte';
	import TimeLogMarkPaidConfirmation from '$lib/component/timelog-management/timelog-mark-paid-confirmation/TimeLogMarkPaidConfirmation.svelte';
	import Icon from 'mdi-svelte';
	import {
		mdiCashCheck,
		mdiCheckCircleOutline,
		mdiCheckDecagramOutline,
		mdiDelete,
		mdiMinusCircleOutline
	} from '@mdi/js';
	import Button from '@smui/button';

	async function handleErrorResponse(response: Response): Promise<void> {
		if (response.status == 500) {
			toast.error('Internal server error.');
		} else if (response.status == 401) {
			toast.error('Unauthorized. You are not allowed to perform this action.');
		} else {
			let err: ErrorResponse = await response.json();
			toast.error(err.detail);
		}
	}

	async function loadTimeLog(): Promise<void> {
		loading = false;
		const token: string = $userStore.token || '';
		await fetch('api/timelog/all', {
			headers: new Headers({ Authorization: `Bearer ${token}` })
		})
			.then(async (response: Response) => {
				if (!response.ok) {
					return Promise.reject(response);
				} else {
					timelogs = await response.json();
					filteredTimeLogs = timelogs;
					loading = true;
				}
			})
			.catch((response: Response) => {
				handleErrorResponse(response);
			});
	}

	async function loadProject(): Promise<void> {
		loading = false;
		const token: string = $userStore.token || '';
		await fetch('api/project/', {
			method: 'GET',
			headers: new Headers({ Authorization: `Bearer ${token}` })
		})
			.then(async (response: Response) => {
				if (!response.ok) {
					return Promise.reject(response);
				} else {
					projectList = await response.json();
					loading = true;
				}
			})
			.catch((response: Response) => {
				handleErrorResponse(response);
			});
	}

	async function loadUsers(): Promise<void> {
		loading = false;
		const token: string = $userStore.token || '';
		await fetch('api/user/list', {
			method: 'GET',
			headers: new Headers({ Authorization: `Bearer ${token}` })
		})
			.then(async (response: Response) => {
				if (!response.ok) {
					return Promise.reject(response);
				} else {
					userList = await response.json();
					loading = true;
				}
			})
			.catch((response: Response) => {
				handleErrorResponse(response);
			});
	}

	onMount(async () => {
		await loadTimeLog();
		await loadProject();
		await loadUsers();
	});

	let timelogs: TimeLog[] = [];
	let filteredTimeLogs: TimeLog[] = [];
	let projectList: Project[] = [];
	let userList: User[] = [];
	let selectedProject = ' ';
	let selectedUser = ' ';

	let sort: keyof TimeLog = 'timestamp';
	let sortDirection: Lowercase<keyof typeof SortValue> = 'ascending';
	let loading = false;

	function formatDate(date: string) {
		return date.split('T')[0];
	}

	$: if (selectedUser || selectedProject) {
		getTimeLogsByUserAndProject();
	}

	const getTimeLogsByUserAndProject = () => {
		if (selectedUser === ' ' && selectedProject === ' ') {
			return (filteredTimeLogs = timelogs);
		} else if (selectedProject === ' ' && selectedUser !== ' ') {
			return (filteredTimeLogs = timelogs.filter(
				(timelog) => timelog.userId.firstName + timelog.userId.lastName === selectedUser
			));
		} else if (selectedUser === ' ' && selectedProject !== ' ') {
			return (filteredTimeLogs = timelogs.filter(
				(timelog) => timelog.projectId.projectName === selectedProject
			));
		}
		return (filteredTimeLogs = timelogs.filter(
			(timelog) =>
				timelog.userId.firstName + timelog.userId.lastName === selectedUser &&
				timelog.projectId.projectName === selectedProject
		));
	};

	let openDeleteDialog = false;
	let selectedTimeLogForDelete: TimeLog | undefined;

	function toggleDeleteDialog(timelog: TimeLog): void {
		selectedTimeLogForDelete = timelog;
		openDeleteDialog = true;
	}

	let openApproveDialog = false;
	let selectedTimeLogForApprove: TimeLog | undefined;

	function toggleApproveDialog(timelog: TimeLog): void {
		selectedTimeLogForApprove = timelog;
		openApproveDialog = true;
	}

	let openMarkPaidDialog = false;
	let selectedTimeLogForMarkPaid: TimeLog | undefined;

	function toggleMarkPaidDialog(timelog: TimeLog): void {
		selectedTimeLogForMarkPaid = timelog;
		openMarkPaidDialog = true;
	}
</script>

<div id="rcorners1">
	<DataTable
		style="margin: 25px; 
				width: 95%;
				min-height: 80%;"
		table$aria-label="Time Log List"
		sortable
		bind:sort
		bind:sortDirection
	>
		<div class="table-container">
			<Head>
				<div style="margin-left: 20px;">
					<h2 class="mdc-typography--headline6" style="margin-top: 15px;">Timelog Management</h2>
				</div>
				<div style="padding-left: 20px;">
					<Select
						class="shaped-outlined"
						variant="outlined"
						label="Filter by Project"
						bind:value={selectedProject}
					>
						<Option value=" " />
						{#each projectList as project}
							<Option value={project.projectName}>{project.projectName}</Option>
						{/each}
					</Select>
					<Select
						class="shaped-outlined"
						variant="outlined"
						label="Filter by User"
						bind:value={selectedUser}
					>
						<Option value=" " />
						{#each userList as user}
							<Option value="{user.firstName}{user.lastName}"
								>{user.firstName} {user.lastName}</Option
							>
						{/each}
					</Select>
				</div>
				<Row>
					<Cell columnId="employee">
						<Label>Employee Name</Label>
					</Cell>
					<Cell columnId="project" style="width: 100%;">
						<Label>Project</Label>
					</Cell>
					<Cell columnId="date">
						<Label>Date</Label>
					</Cell>
					<Cell columnId="hours" style="width: 100%;">
						<Label>Hours</Label>
					</Cell>
					<Cell columnId="approved">
						<Label>Approved</Label>
					</Cell>
					<Cell columnId="actions">
						<Label>Actions</Label>
					</Cell>
				</Row>
			</Head>
			<Body>
				{#each filteredTimeLogs as timelog}
					<Row>
						<Cell>{timelog.userId.firstName} {timelog.userId.lastName}</Cell>
						<Cell>{timelog.projectId.projectName}</Cell>
						<Cell>{formatDate(timelog.timestamp)}</Cell>
						<Cell style="padding-left: 28px;">{timelog.hourSpent}</Cell>
						<Cell>
							{#if timelog.approved}
								<Icon path={mdiCheckCircleOutline} color="green" style="padding-left: 15px;" />
							{:else}
								<Icon path={mdiMinusCircleOutline} color="red" style="padding-left: 15px;" />
							{/if}
						</Cell>
						<Cell>
							{#if timelog.approved}
								{#if timelog.paid}
									<Button
										color="secondary"
										on:click={() => {
											toggleMarkPaidDialog(timelog);
										}}
										disabled
										variant="raised"
									>
										<Icon path={mdiCashCheck} style="padding-right: 3px;" />
										<Label style="padding-left: 3px;">Mark as Paid</Label>
									</Button>
								{:else}
									<Button
										color="secondary"
										on:click={() => {
											toggleMarkPaidDialog(timelog);
										}}
										variant="raised"
									>
										<Icon path={mdiCashCheck} style="padding-right: 3px;" />
										<Label style="padding-left: 3px;">Mark as Paid</Label>
									</Button>
								{/if}
								<Button
									color="secondary"
									on:click={() => {
										toggleApproveDialog(timelog);
									}}
									disabled
									variant="raised"
								>
									<Icon path={mdiCheckDecagramOutline} style="padding-right: 3px;" />
									<Label style="padding-left: 3px;">Approve</Label>
								</Button>
								<Button
									on:click={() => {
										toggleDeleteDialog(timelog);
									}}
									disabled
									variant="raised"
								>
									<Icon path={mdiDelete} style="padding-right: 3px;" />
									<Label style="padding-left: 3px;">Delete</Label>
								</Button>
							{:else}
								<Button
									color="secondary"
									on:click={() => {
										toggleMarkPaidDialog(timelog);
									}}
									disabled
									variant="raised"
								>
									<Icon path={mdiCashCheck} style="padding-right: 3px;" />
									<Label style="padding-left: 3px;">Mark as Paid</Label>
								</Button>
								<Button
									color="secondary"
									on:click={() => {
										toggleApproveDialog(timelog);
									}}
									variant="raised"
								>
									<Icon path={mdiCheckDecagramOutline} style="padding-right: 3px;" />
									<Label style="padding-left: 3px;">Approve</Label>
								</Button>
								<Button
									on:click={() => {
										toggleDeleteDialog(timelog);
									}}
									variant="raised"
								>
									<Icon path={mdiDelete} style="padding-right: 3px;" />
									<Label style="padding-left: 3px;">Delete</Label>
								</Button>
							{/if}
						</Cell>
					</Row>
				{/each}
			</Body>
		</div>
	</DataTable>
	<TimeLogDeleteConfirmation
		bind:openDeleteDialog
		bind:selectedTimeLogForDelete
		on:loadTimeLog={loadTimeLog}
	/>
	<TimeLogApproveConfirmation
		bind:openApproveDialog
		bind:selectedTimeLogForApprove
		on:loadTimeLog={loadTimeLog}
	/>
	<TimeLogMarkPaidConfirmation
		bind:openMarkPaidDialog
		bind:selectedTimeLogForMarkPaid
		on:loadTimeLog={loadTimeLog}
	/>
</div>

<style>
	#rcorners1 {
		border-radius: 20px;
		background: white;
		margin: 25px;
		width: auto;
		height: 100%;
	}

	.table-container {
		min-height: 80vh;
		background: white;
		border: none;
	}
</style>
