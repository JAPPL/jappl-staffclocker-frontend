<script lang="ts">
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import LinearProgress from '@smui/linear-progress';
	import Select, { Option } from '@smui/select';
	import Button, { Label } from '@smui/button';
	import { form, field } from 'svelte-forms';
	import { required } from 'svelte-forms/validators';
	import { userStore } from '../../../store/user';
	import type { ErrorResponse } from '../../../interface/error-response';
	import toast from 'svelte-french-toast';
	import { createEventDispatcher } from 'svelte';
	import type { Project } from '../../../interface/project';
	import type { User } from '../../../interface/user';
	import type { ProjectMember } from '../../../interface/project-member';

	const dispatch = createEventDispatcher();

	export let loadingDialog = true;
	export let openCreateDialog = false;
	export let allProjects: Project[] = [];
	export let allUsers: User[] = [];
	export let allProjectMembers: ProjectMember[] = [];
	let projectId = field('project', null, [required()]);
	let userId = field('user', null, [required()]);
	let projectForm = form(projectId, userId);
	let loadUser = true;
	let filterUserOptions: User[] = [];

	function filterUser(): void {
		if ($projectId.value) {
			let filterUserByProject: User[] = allProjectMembers
				.filter((member: ProjectMember) => {
					return member.project.projectId === $projectId.value;
				})
				.map((member: ProjectMember) => member.user);
			filterUserOptions = allUsers.filter((user: User) => {
				return (
					filterUserByProject.find((filterUser: User) => filterUser.userId == user.userId) ===
					undefined
				);
			});
			loadUser = false;
		} else {
			loadUser = true;
		}
		$userId.value = null;
	}

	async function closeHandler(e: CustomEvent<{ action: string }>): Promise<void> {
		switch (e.detail.action) {
			case 'submit':
				openCreateDialog = true;
				await submitProjectForm();
				break;
			case 'close':
				$projectId.value = null;
				$userId.value = null;
		}
	}

	async function handleErrorResponse(response: Response): Promise<void> {
		if (response.status == 400) {
			let err: ErrorResponse = await response.json();
			if (err.detail) {
				toast.error(err.detail);
			} else {
				toast.error('Please select all fields before creating.');
			}
		} else if (response.status == 500) {
			toast.error('Internal server error.');
		} else {
			let err: ErrorResponse = await response.json();
			toast.error(err.detail);
		}
	}

	async function createProject(): Promise<void> {
		loadingDialog = false;
		const token: string = $userStore.token || '';
		let formData: FormData = new FormData();
		formData.append('project', $projectId.value);
		formData.append('user', $userId.value);
		await fetch('api/project-member/add', {
			method: 'POST',
			headers: new Headers({ Authorization: `Bearer ${token}` }),
			body: formData
		})
			.then(async (response: Response) => {
				if (!response.ok) {
					return Promise.reject(response);
				}
				dispatch('loadMember', true);
				$projectId.value = null;
				$userId.value = null;
				toast.success('Add project member successfully.');
				openCreateDialog = false;
			})
			.catch(async (errorResponse: Response) => {
				await handleErrorResponse(errorResponse);
			})
			.finally(() => (loadingDialog = true));
	}

	async function submitProjectForm(): Promise<void> {
		await projectForm.validate();
		if ($projectForm.valid) {
			await createProject();
		}
	}
</script>

<div>
	<Dialog
		bind:open={openCreateDialog}
		aria-labelledby="mandatory-create-title"
		aria-describedby="mandatory-content"
		scrimClickAction=""
		escapeKeyAction=""
		on:SMUIDialog:closed={closeHandler}
		surface$style="min-width: calc(100vw - 60vw); max-width: calc(100vw - 100px); min-height: calc(50vh) "
	>
		<Title id="mandatory-create-title" data-testid="mandatory-create-title"
			>Add project member</Title
		>
		{#if loadingDialog}
			<div class="dialog-divider" />
		{/if}
		<LinearProgress data-testid="load-bar" bind:closed={loadingDialog} indeterminate />
		<Content id="mandatory-content" data-testid="mandatory-content">
			<Select
				disabled={!loadingDialog}
				variant="outlined"
				data-testid="project-selector"
				key={(project) => `${project ? project.projectId : ''}`}
				on:SMUIMenu:selected={filterUser}
				bind:value={$projectId.value}
				label="Selected project"
				invalid={$projectForm.hasError('project.required')}
				class="shaped-outlined"
			>
				<Option value={undefined} />
				{#each allProjects as project (project.projectName)}
					<Option data-testid={project.projectName} value={project.projectId}
						>{project.projectName}</Option
					>
				{/each}
			</Select>
			<Select
				disabled={!loadingDialog || loadUser}
				variant="outlined"
				data-testid="user-selector"
				key={(user) => `${user ? user.userId : ''}`}
				bind:value={$userId.value}
				invalid={$projectForm.hasError('user.required')}
				label="Select User"
				class="shaped-outlined"
			>
				<Option value={undefined} />
				{#each filterUserOptions as user (user.firstName)}
					<Option value={user.userId}>{user.firstName} {user.lastName}</Option>
				{/each}
			</Select>
			{#if $projectForm.hasError('project.required') || $projectForm.hasError('user.required')}
				<p data-testid="error-message" class="invalid-field">Please select both fields</p>
			{/if}
		</Content>

		<Actions>
			<Button action="close" data-testid="close-button">
				<Label>Close</Label>
			</Button>
			<Button data-testid="confirm-button" color="secondary" variant="unelevated" action="submit">
				<Label>Confirm</Label>
			</Button>
		</Actions>
	</Dialog>
</div>

<style lang="css">
	.invalid-field {
		margin: 10px;
		color: #b71c1cff;
	}
	.dialog-divider {
		margin: 2px 0;
		border-bottom: 1px solid #bfbfbf;
	}
</style>
