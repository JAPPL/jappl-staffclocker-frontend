<script lang="ts">
	import { userStore } from '../../../lib/store/user.js';
	import Select, { Option } from '@smui/select';
	import type { ErrorResponse } from '../../../lib/interface/error-response';
	import DataTable, { Head, Body, Row, Cell, Label, SortValue } from '@smui/data-table';
	import IconButton from '@smui/icon-button';
	import { onMount } from 'svelte';
	import toast from 'svelte-french-toast';
	import type { TimeLog } from '../../../lib/interface/timelog';
	import type { Project } from '../../../lib/interface/project';
	import Icon from '@iconify/svelte';
	import TimeLogDeleteConfirmation from '$lib/component/timelog/timelog-delete-confirmation/TimeLogDeleteConfirmation.svelte';
	import TimeLogEditConfirmation from '$lib/component/timelog/timelog-edit-confirmation/TimeLogEditConfirmation.svelte';
	import { field, form } from 'svelte-forms';
	import { required } from 'svelte-forms/validators';

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

	onMount(async () => {
		await loadTimeLog();
		await loadProject();
	});

	let timelogs: TimeLog[] = [];
	let filteredTimeLogs: TimeLog[] = [];
	let projectList: Project[] = [];
	let selectedProject = '';
	let loadingDialog = true;
	let openDeleteDialog = false;
	let openEditDialog = false;
	let selectedTimeLogForDelete: TimeLog | undefined;
	let message = field('message', '', [required()]);
	let id = field('id', 0);
	let hour_spent = field('hour_spent', 0, [required()]);
	let projectId = field('projectId', 0);
	let timeLogForm = form(message, hour_spent, id, projectId);

	let sort: keyof TimeLog = 'timestamp';
	let sortDirection: Lowercase<keyof typeof SortValue> = 'ascending';
	let loading = false;

	function formatDate(date: string) {
		return date.split('T')[0];
	}

	function toggleEditDialog(timelog: TimeLog): void {
		$id.value = timelog.id;
		$message.value = timelog.message;
		$hour_spent.value = timelog.hourSpent;
		$projectId.value = timelog.projectId.projectId;
		openEditDialog = !openEditDialog;
	}

	function toggleDeleteDialog(timelog: TimeLog): void {
		selectedTimeLogForDelete = timelog;
		openDeleteDialog = true;
	}

	$: if (selectedProject) {
		getTimeLogsByProject();
	}

	const getTimeLogsByProject = () => {
		if (selectedProject === ' ') {
			return (filteredTimeLogs = timelogs);
		}
		return (filteredTimeLogs = timelogs.filter(
			(timelog) => timelog.projectId.projectName === selectedProject
		));
	};
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
					<h2 class="mdc-typography--headline6" style="margin-top: 15px;">Time Logs History</h2>
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
				</div>
				<Row>
					<Cell columnId="date">
						<Label>Date</Label>
					</Cell>
					<Cell sortable={false} columnId="description">
						<Label>Description</Label>
					</Cell>
					<Cell columnId="project" style="width: 100%;">
						<Label>Project</Label>
					</Cell>
					<Cell columnId="hours" style="width: 100%;">
						<Label>Hours</Label>
					</Cell>
					<Cell columnId="approved">
						<Label>Approved</Label>
					</Cell>
					<Cell sortable={false}>
						<Label>Actions</Label>
					</Cell>
				</Row>
			</Head>
			<Body>
				{#each filteredTimeLogs as timelog}
					<Row>
						<Cell>{formatDate(timelog.timestamp)}</Cell>
						<Cell>{timelog.message}</Cell>
						<Cell>{timelog.projectId.projectName}</Cell>
						<Cell style="padding-left: 28px;">{timelog.hourSpent}</Cell>
						<Cell>
							{#if timelog.approved}
								<Icon
									icon="material-symbols:check-circle-outline-rounded"
									color="green"
									width="25"
									height="25"
									style="padding-left: 15px;"
								/>
							{:else}
								<Icon
									icon="ph:x-circle-bold"
									color="red"
									width="25"
									height="25"
									style="padding-left: 15px;"
								/>
							{/if}
						</Cell>
						{#if timelog.approved}
							<IconButton
								class="material-icons"
								on:click={() => {
									toggleEditDialog(timelog);
								}}
								disabled>edit</IconButton
							>
							<IconButton
								class="material-icons"
								on:click={() => {
									toggleDeleteDialog(timelog);
								}}
								disabled>delete</IconButton
							>
						{:else}
							<IconButton
								class="material-icons"
								on:click={() => {
									toggleEditDialog(timelog);
								}}>edit</IconButton
							>
							<IconButton
								class="material-icons"
								on:click={() => {
									toggleDeleteDialog(timelog);
								}}>delete</IconButton
							>
						{/if}
					</Row>
				{/each}
			</Body>
		</div>
	</DataTable>
	<TimeLogEditConfirmation
		bind:loadingDialog
		bind:openEditDialog
		bind:message
		bind:timeLogForm
		bind:id
		bind:projectId
		bind:hour_spent
		on:loadTimeLog={loadTimeLog}
	/>
	<TimeLogDeleteConfirmation
		bind:openDeleteDialog
		bind:selectedTimeLogForDelete
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
	}
</style>
