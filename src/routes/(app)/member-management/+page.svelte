<script lang="ts">
	import Card from '@smui/card';
	import Icon from 'mdi-svelte';
	import LinearProgress from '@smui/linear-progress';
	import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
	import { mdiAccountPlus, mdiDeleteEmpty } from '@mdi/js';
	import type { Project } from '../../../lib/interface/project';
	import type { ErrorResponse } from '../../../lib/interface/error-response';
	import Button, { Label } from '@smui/button';
	import Select, { Option } from '@smui/select';
	import { onMount } from 'svelte';
	import toast from 'svelte-french-toast';
	import { userStore } from '$lib/store/user.js';
	import type { ProjectMember } from '$lib/interface/project-member';
	import type { User } from '$lib/interface/user';
	import type { MemberFilter } from '$lib/interface/member-filter';
	import { loadProjectMember } from '$lib/service/project-member-service';
	import ProjectMemberDeleteConfirmation from '$lib/component/project-member/project-member-delete-confirmation/ProjectMemberDeleteConfirmation.svelte';
	import ProjectMemberCreateDialog from '$lib/component/project-member/project-member-create-dialog/ProjectMemberCreateDialog.svelte';

	let loading = false;
	let openDeleteDialog = false;
	let openCreateDialog = false;
	let selectedProjectMemberForDelete: ProjectMember | undefined;
	let projectList: Project[] = [];
	let projectMemberList: ProjectMember[] = [];
	let userList: User[] = [];
	let filter: MemberFilter = {
		project: undefined,
		user: undefined
	};

	onMount(async () => {
		await loadAll();
	});

	async function loadAll(): Promise<void> {
		await loadProject();
		await loadProjectMemberWithFilter();
		await loadUser();
	}

	async function handleErrorResponse(response: Response): Promise<void> {
		if (response.status == 500) {
			toast.error('Internal server error.');
		} else {
			let err: ErrorResponse = await response.json();
			toast.error(err.detail);
		}
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

	async function loadProjectMemberWithFilter(): Promise<void> {
		loading = false;
		const token: string = $userStore.token || '';
		await loadProjectMember(filter, token)
			.then(async (response: Response) => {
				if (!response.ok) {
					return Promise.reject(response);
				} else {
					projectMemberList = await response.json();
					loading = true;
				}
			})
			.catch((response: Response) => {
				handleErrorResponse(response);
			});
	}

	async function loadUser(): Promise<void> {
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

	function toggleDeleteDialog(projectMember: ProjectMember): void {
		selectedProjectMemberForDelete = projectMember;
		openDeleteDialog = true;
	}
</script>

<div class="container">
	<Card style="padding: 20px;">
		<div style="display: flex; justify-content: space-between">
			<h2 class="mdc-typography--headline6" style="margin: 0;">Project Member Management</h2>
			<Button
				disabled={!loading}
				color="secondary"
				variant="unelevated"
				on:click={() => {
					openCreateDialog = true;
				}}
			>
				<Icon path={mdiAccountPlus} />
				<Label style="margin-left: 5px">Add project member</Label>
			</Button>
		</div>
		<div class="divider" />
		<div class="filter-container">
			<Select
				disabled={!loading}
				variant="outlined"
				key={(project) => `${project ? project.projectId : null}`}
				bind:value={filter.project}
				on:SMUIMenu:selected={loadProjectMemberWithFilter}
				label="Filter by project"
				class="shaped-outlined"
			>
				<Option value={null}>Not selected</Option>
				{#each projectList as project (project.projectName)}
					<Option value={project}>{project.projectName}</Option>
				{/each}
			</Select>
			<Select
				disabled={!loading}
				key={(user) => `${user ? user.userId : null}`}
				variant="outlined"
				bind:value={filter.user}
				on:SMUIMenu:selected={loadProjectMemberWithFilter}
				label="Filter by user"
				class="shaped-outlined"
			>
				<Option value={null}>Not selected</Option>
				{#each userList as userOption (userOption.firstName)}
					<Option value={userOption}>{userOption.firstName} {userOption.lastName}</Option>
				{/each}
			</Select>
		</div>
		<div class="table-container">
			<DataTable table$aria-label="Project Member List" style="width: 100%;">
				<Head>
					<title>Project list</title>
					<Row>
						<Cell numeric style="width: 5%">ID</Cell>
						<Cell style="width: 30%">Employee</Cell>
						<Cell style="width: 60%">Project</Cell>
						<Cell />
					</Row>
				</Head>
				<Body>
					{#each projectMemberList as projectMember}
						<Row>
							<Cell numeric>{projectMember.projectMemberId}</Cell>
							<Cell>{projectMember.user.firstName} {projectMember.user.lastName}</Cell>
							<Cell>{projectMember.project.projectName}</Cell>
							<Cell>
								<Button
									disabled={!loading}
									on:click={() => {
										toggleDeleteDialog(projectMember);
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

	<ProjectMemberDeleteConfirmation
		bind:openDeleteDialog
		bind:selectedProjectMemberForDelete
		on:loadMember={loadAll}
	/>

	<ProjectMemberCreateDialog
		bind:openCreateDialog
		bind:loadingDialog={loading}
		bind:allProjects={projectList}
		bind:allProjectMembers={projectMemberList}
		bind:allUsers={userList}
		on:loadMember={loadAll}
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

	.filter-container {
		margin-bottom: 16px;
	}

	.divider {
		margin: 16px 0;
		border-bottom: 1px solid #bfbfbf;
	}
</style>
