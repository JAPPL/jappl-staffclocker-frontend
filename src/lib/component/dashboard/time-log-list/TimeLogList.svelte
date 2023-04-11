<script lang="ts">
	import Select, { Option } from '@smui/select';
	import DataTable, { Head, Body, Row, Cell, Label, SortValue } from '@smui/data-table';
	import LinearProgress from '@smui/linear-progress';
	import type { TimeLog } from '../../../interface/timelog';
	import type { Project } from '../../../interface/project';
	import TimeLogDeleteConfirmation from '$lib/component/timelog-management/timelog-delete-confirmation/TimeLogDeleteConfirmation.svelte';
	import TimeLogEditConfirmation from '$lib/component/timelog-management/timelog-edit-confirmation/TimeLogEditConfirmation.svelte';
	import TimeLogMarkPaidConfirmation from '$lib/component/timelog-management/timelog-mark-paid-confirmation/TimeLogMarkPaidConfirmation.svelte';
	import Icon from 'mdi-svelte';
	import { mdiPencil, mdiCheckCircleOutline, mdiDelete, mdiMinusCircleOutline } from '@mdi/js';
	import Button from '@smui/button';
	import { createEventDispatcher } from 'svelte';
	import { field, form } from 'svelte-forms';
	import { min, required } from 'svelte-forms/validators';

	const dispatch = createEventDispatcher();

	export let projectList: Project[] = [];
	export let loadingProject = false;

	export let timelogs: TimeLog[] = [];
	export let filteredTimeLogs: TimeLog[] = [];
	export let loadingTimelog = false;

	let selectedProject = ' ';
	let selectedUser = ' ';
	let openMarkPaidDialog = false;
	let selectedTimeLogForMarkPaid: TimeLog | undefined;
	let openDeleteDialog = false;
	let selectedTimeLogForDelete: TimeLog | undefined;
	let openEditDialog = false;

	let id = field('id', 0);
	let hourSpent = field('hourSpent', 0, [min(1)]);
	let message = field('message', '', [required()]);
	let projectId = field('projectId', 0, [min(1)]);
	let timeLogForm = form(message, hourSpent, id, projectId);

	let sort: keyof TimeLog = 'timestamp';
	let sortDirection: Lowercase<keyof typeof SortValue> = 'ascending';

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

	function emitLoadTimeLogEvent() {
		dispatch('loadTimeLog', true);
	}

	function toggleDeleteDialog(timelog: TimeLog): void {
		selectedTimeLogForDelete = timelog;
		openDeleteDialog = true;
	}

	function toggleEditDialog(timelog: TimeLog): void {
		console.log(timelog.projectId.projectId, $projectId.value, timelog);
		$id.value = timelog.id;
		$projectId.value = timelog.projectId.projectId;
		$hourSpent.value = timelog.hourSpent;
		$message.value = timelog.message;
		console.log($projectId.value);
		openEditDialog = true;
		console.log($projectId.value);
	}
</script>

<div>
	<div style="text-align: left; display: flex;">
		<div class="column" style="margin-left: 0;">
			<h2 class="mdc-typography--headline6" style="margin-top: 15px;">Timelog History</h2>
		</div>
		<div class="column">
			<Select
				class="shaped-outlined"
				variant="outlined"
				label="Filter by Project"
				disabled={loadingProject}
				bind:value={selectedProject}
			>
				<Option value=" " />
				{#each projectList as project}
					<Option value={project.projectName}>{project.projectName}</Option>
				{/each}
			</Select>
		</div>
	</div>
	<div class="table-container">
		<DataTable
			table$aria-label="Time Log List"
			style="width: 100%"
			sortable
			bind:sort
			bind:sortDirection
		>
			<Head>
				<title>Time log List</title>
				<Row>
					<Cell columnId="project">
						<Label>Project</Label>
					</Cell>
					<Cell columnId="description" style="width: 100%;">
						<Label>Description</Label>
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
						<Cell>{timelog.projectId.projectName}</Cell>
						<Cell>{timelog.message}</Cell>
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
							<Button
								color="secondary"
								disabled={timelog.approved}
								on:click={() => {
									toggleEditDialog(timelog);
								}}
								variant="raised"
							>
								<Icon path={mdiPencil} />
								<Label style="padding-left: 3px;">Edit</Label>
							</Button>
							<Button
								on:click={() => {
									toggleDeleteDialog(timelog);
								}}
								disabled={timelog.approved}
								variant="raised"
							>
								<Icon path={mdiDelete} />
								<Label style="padding-left: 3px;">Delete</Label>
							</Button>
						</Cell>
					</Row>
				{/each}
			</Body>

			<LinearProgress
				indeterminate
				closed={loadingTimelog}
				aria-label="Data is being loaded..."
				slot="progress"
			/>
		</DataTable>
	</div>
	<TimeLogDeleteConfirmation
		bind:openDeleteDialog
		bind:selectedTimeLogForDelete
		on:loadTimeLog={emitLoadTimeLogEvent}
	/>
	<TimeLogEditConfirmation
		bind:openEditDialog
		bind:id
		bind:hourSpent
		bind:message
		bind:projectId
		bind:timeLogForm
		bind:projectOptions={projectList}
		on:loadTimeLog={emitLoadTimeLogEvent}
	/>
	<TimeLogMarkPaidConfirmation
		bind:openMarkPaidDialog
		bind:selectedTimeLogForMarkPaid
		on:loadTimeLog={emitLoadTimeLogEvent}
	/>
</div>

<style>
	.column {
		margin-left: 20px;
		float: left;
	}

	.table-container {
		max-height: 70vh;
		overflow-y: auto;
		background: white;
		border: none;
	}
</style>
