<script lang="ts">
	import Card from '@smui/card';
	import Icon from 'mdi-svelte';
	import ProjectDialog from './ProjectDialog.svelte';
	import LinearProgress from '@smui/linear-progress';
	import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
	import { mdiFolderPlus, mdiFolderEdit, mdiDeleteEmpty } from '@mdi/js';
	import type { Project } from '../../../lib/interface/project';
	import type { ErrorResponse } from '../../../lib/interface/error-response';
	import Button, { Label } from '@smui/button';
	import { onMount } from 'svelte';
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
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

	async function deleteProject(project: Project | undefined) {
		if (project) {
			loading = false;
			const token: string = $userStore.token || '';
			await fetch(`api/project/delete/${project.projectId}`, {
				method: 'DELETE',
				headers: new Headers({ Authorization: `Bearer ${token}` })
			}).then(async (response: Response) => {
				if (!response.ok) {
					const error: ErrorResponse = await response.json();
					toast.error(error.detail);
				} else {
					toast.success(`Delete project ${project.projectName} successfully.`);
					await loadProject();
				}
				selectedProjectForDelete = undefined;
			});
		} else {
			toast.error('No project selected.');
		}
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

	<ProjectDialog bind:loadingDialog bind:openCreateDialog bind:projectName />
	<Dialog
		bind:open={openDeleteDialog}
		scrimClickAction=""
		escapeKeyAction=""
		aria-labelledby="mandatory-title"
		aria-describedby="mandatory-content"
	>
		<Title id="mandatory-title">Project Delete Confirmation</Title>
		<Content id="mandatory-content">
			Are you sure to delete project {selectedProjectForDelete?.projectName || 'N/A'}?
		</Content>
		<Actions>
			<Button action="close">
				<Label>Close</Label>
			</Button>
			<Button
				color="secondary"
				variant="unelevated"
				on:click={deleteProject(selectedProjectForDelete)}
			>
				<Label>Confirm</Label>
			</Button>
		</Actions>
	</Dialog>
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
