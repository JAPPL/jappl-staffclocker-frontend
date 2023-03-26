<script lang="ts">
	import Card from '@smui/card';
	import Icon from 'mdi-svelte';
	import ProjectDialog from './ProjectDialog.svelte';
	import ProjectDeleteConfirmation from './ProjectDeleteConfirmation.svelte';
	import LinearProgress from '@smui/linear-progress';
	import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
	import { mdiFolderPlus, mdiFolderEdit, mdiDeleteEmpty } from '@mdi/js';
	import type { Project } from '../../../lib/interface/project';
	import type { ErrorResponse } from '../../../lib/interface/error-response';
	import Button, { Label } from '@smui/button';
	import { onMount } from 'svelte';
	import toast from 'svelte-french-toast';
	import { userStore } from '../../../lib/store/user.js';

	let loading = false;
	let loadingDialog = true;
	let openCreateDialog = false;
	let openDeleteDialog = false;
	let projectList: Project[] = [];
	let selectedProjectForDelete: Project | undefined;

	let projectName = '';

	onMount(async () => {
		await loadProject();
	});

	async function loadProject(): Promise<void> {
		loading = false;
		const token: string = $userStore.token || '';
		await fetch('api/project/', {
			method: 'GET',
			headers: new Headers({ Authorization: `Bearer ${token}` })
		}).then(async (response: Response) => {
			if (!response.ok) {
				const error: ErrorResponse = await response.json();
				toast.error(error.detail);
			} else {
				projectList = await response.json();
				loading = true;
			}
		});
	}

	function toggleCreateDialog(): void {
		openCreateDialog = !openCreateDialog;
	}

	function toggleDeleteDialog(project: Project) {
		selectedProjectForDelete = project;
		openDeleteDialog = true;
	}
</script>

<div class="container">
	<Card style="padding: 20px;">
		<div style="display: flex; justify-content: space-between">
			<h2 class="mdc-typography--headline6" style="margin: 0;">Project Management</h2>
			<Button
				disabled={!loading}
				color="secondary"
				variant="unelevated"
				on:click={toggleCreateDialog}
			>
				<Icon path={mdiFolderPlus} />
				<Label style="margin-left: 5px">Create project</Label>
			</Button>
		</div>
		<div class="divider" />
		<div class="table-container">
			<DataTable table$aria-label="Project List" style="width: 100%;">
				<Head>
					<Row>
						<Cell numeric>ID</Cell>
						<Cell style="width: 90%;">Name</Cell>
						<Cell />
					</Row>
				</Head>
				<Body>
					{#each projectList as project}
						<Row>
							<Cell numeric>{project.projectId}</Cell>
							<Cell>{project.projectName}</Cell>
							<Cell>
								<Button disabled={!loading}>
									<Icon path={mdiFolderEdit} />
									<Label style="margin-left: 5px">Edit</Label>
								</Button>
								<Button
									disabled={!loading}
									on:click={() => {
										toggleDeleteDialog(project);
									}}
								>
									<Icon path={mdiDeleteEmpty} />
									<Label style="margin-left: 5px">Delete</Label>
								</Button>
							</Cell>
						</Row>
					{/each}
				</Body>

				<LinearProgress
					indeterminate
					bind:closed={loading}
					aria-label="Data is being loaded..."
					slot="progress"
				/>
			</DataTable>
		</div>
	</Card>

	<ProjectDialog
		bind:loadingDialog
		bind:openCreateDialog
		bind:projectName
		on:loadProject={loadProject}
	/>
	<ProjectDeleteConfirmation
		bind:openDeleteDialog
		bind:selectedProjectForDelete
		on:loadProject={loadProject}
	/>
</div>

<style lang="css">
	.container:global(.mdc-card) {
		padding: 20px;
	}

	.table-container {
		max-height: 75vh;
		overflow-y: auto;
	}

	.divider {
		margin: 16px 0;
		border-bottom: 1px solid #bfbfbf;
	}
</style>
