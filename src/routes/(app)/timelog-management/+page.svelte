<script lang="ts">
	import { userStore } from '../../../lib/store/user.js';
	import Card from '@smui/card';
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

	let timelogs: TimeLog[] = [];
	let filteredTimeLogs: TimeLog[] = [];
	let projectList: Project[] = [];
	let userList: User[] = [];
	let selectedProject = ' ';
	let selectedUser = ' ';
	let openDeleteDialog = false;
	let selectedTimeLogForDelete: TimeLog | undefined;
	let openApproveDialog = false;
	let selectedTimeLogForApprove: TimeLog | undefined;
	let openMarkPaidDialog = false;
	let selectedTimeLogForMarkPaid: TimeLog | undefined;

	let sort: keyof TimeLog = 'timestamp';
	let sortDirection: Lowercase<keyof typeof SortValue> = 'ascending';
	let loading = false;

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

	function toggleDeleteDialog(timelog: TimeLog): void {
		selectedTimeLogForDelete = timelog;
		openDeleteDialog = true;
	}

	function toggleApproveDialog(timelog: TimeLog): void {
		selectedTimeLogForApprove = timelog;
		openApproveDialog = true;
	}

	function toggleMarkPaidDialog(timelog: TimeLog): void {
		selectedTimeLogForMarkPaid = timelog;
		openMarkPaidDialog = true;
	}
</script>

<div class="container">
	<Card style="padding: 20px;">
		<div style="margin-bottom: 16px">
			<h2 class="mdc-typography--headline6" style="margin-top: 0;">Timelog Management</h2>
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
					<Option value="{user.firstName}{user.lastName}">{user.firstName} {user.lastName}</Option>
				{/each}
			</Select>
		</div>
		<div class="table-container">
			<DataTable
				style="width: 100%;"
				table$aria-label="Time Log List"
				sortable
				bind:sort
				bind:sortDirection
			>
				<Head>
					<title>Time Log list</title>
					<Row>
						<Cell columnId="employee">
							<Label>Employee Name</Label>
						</Cell>
						<Cell columnId="project" style="width: 10%;">
							<Label>Project</Label>
						</Cell>
						<Cell columnId="project" style="width: 100%;">
							<Label>Description</Label>
						</Cell>
						<Cell columnId="date">
							<Label>Date</Label>
						</Cell>
						<Cell columnId="hours" style="width: 10%;">
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
							<Cell style="width: 10px">
								<span style="word-break: break-all">
									{timelog.message}
								</span>
							</Cell>
							<Cell>{formatDate(timelog.timestamp)}</Cell>
							<Cell style="padding-left: 28px;">{timelog.hourSpent}</Cell>
							<Cell>
								<div style="display: flex; justify-content: center">
									{#if timelog.approved}
										<Icon path={mdiCheckCircleOutline} color="green" />
									{:else}
										<Icon path={mdiMinusCircleOutline} color="red" />
									{/if}
								</div>
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
											<Icon path={mdiCashCheck} />
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
											<Icon path={mdiCashCheck} />
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
										<Icon path={mdiCheckDecagramOutline} />
										<Label style="padding-left: 3px;">Approve</Label>
									</Button>
									<Button
										on:click={() => {
											toggleDeleteDialog(timelog);
										}}
										disabled
										variant="raised"
									>
										<Icon path={mdiDelete} />
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
										<Icon path={mdiCashCheck} />
										<Label style="padding-left: 3px;">Mark as Paid</Label>
									</Button>
									<Button
										color="secondary"
										on:click={() => {
											toggleApproveDialog(timelog);
										}}
										variant="raised"
									>
										<Icon path={mdiCheckDecagramOutline} />
										<Label style="padding-left: 3px;">Approve</Label>
									</Button>
									<Button
										on:click={() => {
											toggleDeleteDialog(timelog);
										}}
										variant="raised"
									>
										<Icon path={mdiDelete} />
										<Label style="padding-left: 3px;">Delete</Label>
									</Button>
								{/if}
							</Cell>
						</Row>
					{/each}
				</Body>
			</DataTable>
		</div>
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
	</Card>
</div>

<style>
	.container:global(.mdc-card) {
		padding: 20px;
	}

	.table-container {
		width: 100%;
		max-height: 75vh;
		overflow-y: auto;
	}
</style>
