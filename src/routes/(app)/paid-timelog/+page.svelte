<script lang="ts">
	import { userStore } from '../../../lib/store/user.js';
	import Select, { Option } from '@smui/select';
	import type { ErrorResponse } from '../../../lib/interface/error-response';
	import DataTable, { Head, Body, Row, Cell, Label, SortValue } from '@smui/data-table';
	import { onMount } from 'svelte';
	import Card from '@smui/card';
	import toast from 'svelte-french-toast';
	import type { TimeLog } from '../../../lib/interface/timelog';
	import type { Project } from '../../../lib/interface/project';
	import Icon from 'mdi-svelte';
	import { mdiCheckCircleOutline } from '@mdi/js';

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

	function getPaidTimeLogs(timelogs: TimeLog[]): TimeLog[] {
		return timelogs.filter((timelog) => timelog.paid === true);
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
					timelogs = getPaidTimeLogs(timelogs);
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

	let sort: keyof TimeLog = 'timestamp';
	let sortDirection: Lowercase<keyof typeof SortValue> = 'ascending';
	let loading = false;

	function formatDate(date: string) {
		return date.split('T')[0];
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

<div class="container">
	<Card style="padding: 20px">
		<div>
			<h2 class="mdc-typography--headline6" style="margin-top: 0;">Paid Time Logs History</h2>
		</div>
		<div style="margin-bottom: 16px">
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
		<div class="table-container">
			<DataTable
				style="width: 100%"
				table$aria-label="Time Log List"
				sortable
				bind:sort
				bind:sortDirection
			>
				<Head>
					<Row>
						<Cell columnId="date">
							<Label>Date</Label>
						</Cell>
						<Cell sortable={false} columnId="description">
							<Label>Employee Name</Label>
						</Cell>
						<Cell sortable={false} columnId="description" style="width: 70%;">
							<Label>Description</Label>
						</Cell>
						<Cell columnId="project" style="width: 20%;">
							<Label>Project</Label>
						</Cell>
						<Cell columnId="hours" style="width: 10%;">
							<Label>Hours</Label>
						</Cell>
						<Cell columnId="approved">
							<Label>Approved</Label>
						</Cell>
					</Row>
				</Head>
				<Body>
					{#each filteredTimeLogs as timelog}
						<Row>
							<Cell>{formatDate(timelog.timestamp)}</Cell>
							<Cell>{timelog.userId.firstName} {timelog.userId.lastName}</Cell>
							<Cell>{timelog.message}</Cell>
							<Cell>{timelog.projectId.projectName}</Cell>
							<Cell style="padding-left: 28px;">{timelog.hourSpent}</Cell>
							<Cell>
								{#if timelog.approved}
									<Icon
										path={mdiCheckCircleOutline}
										color="green"
										width="25"
										height="25"
										style="padding-left: 15px;"
									/>
								{:else}
									<Icon
										path={mdiCheckCircleOutline}
										color="red"
										width="25"
										height="25"
										style="padding-left: 15px;"
									/>
								{/if}
							</Cell>
						</Row>
					{/each}
				</Body>
			</DataTable>
		</div>
	</Card>
</div>

<style>
	.container:global(.mdc-card) {
		padding: 20px;
	}

	.table-container {
		max-height: 75vh;
		overflow-y: auto;
	}
</style>
