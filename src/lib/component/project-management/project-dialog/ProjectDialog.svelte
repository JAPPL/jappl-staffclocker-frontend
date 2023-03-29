<script lang="ts">
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import LinearProgress from '@smui/linear-progress';
	import Textfield from '@smui/textfield';
	import Button, { Label } from '@smui/button';
	import { form, field } from 'svelte-forms';
	import { required } from 'svelte-forms/validators';
	import { userStore } from '../../../store/user';
	import type { ErrorResponse } from '../../../interface/error-response';
	import toast from 'svelte-french-toast';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let loadingDialog = true;
	export let openCreateDialog = false;
	export let projectName = field('projectName', '', [required()]);
	export let projectId = field('projectId', 0);
	export let projectForm = form(projectName, projectId);
	export let isEdit = false;

	async function closeHandler(e: CustomEvent<{ action: string }>): Promise<void> {
		switch (e.detail.action) {
			case 'submit':
				openCreateDialog = true;
				await submitProjectForm();
				break;
			case 'close':
				$projectName.value = '';
				isEdit = false;
		}
	}

	async function handleErrorResponse(response: Response): Promise<void> {
		if (response.status == 400) {
			toast.error('Name is duplicated or not given.');
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
		formData.append('project_name', $projectName.value);
		await fetch('api/project/create/', {
			method: 'POST',
			headers: new Headers({ Authorization: `Bearer ${token}` }),
			body: formData
		})
			.then(async (response: Response) => {
				if (!response.ok) {
					return Promise.reject(response);
				}
				dispatch('loadProject', true);
				$projectName.value = '';
				toast.success('Create project successfully.');
				openCreateDialog = false;
			})
			.catch(async (errorResponse: Response) => {
				await handleErrorResponse(errorResponse);
			})
			.finally(() => (loadingDialog = true));
	}

	async function editProject(): Promise<void> {
		loadingDialog = false;
		const token: string = $userStore.token || '';
		let formData: FormData = new FormData();
		formData.append('project_name', $projectName.value);
		await fetch(`api/project/update/${$projectId.value}`, {
			method: 'PUT',
			headers: new Headers({ Authorization: `Bearer ${token}` }),
			body: formData
		})
			.then(async (response: Response) => {
				if (!response.ok) {
					return Promise.reject(response);
				}
				dispatch('loadProject', true);
				$projectName.value = '';
				$projectId.value = 0;
				toast.success('Edit project successfully.');
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
			if (!isEdit) {
				await createProject();
			} else {
				await editProject();
			}
		}
	}
</script>

<div>
	<Dialog
		bind:open={openCreateDialog}
		aria-labelledby="mandatory-title"
		aria-describedby="mandatory-content"
		scrimClickAction=""
		escapeKeyAction=""
		on:SMUIDialog:closed={closeHandler}
		surface$style="min-width: calc(100vw - 60vw); max-width: calc(100vw - 100px);"
	>
		<Title id="mandatory-title">{isEdit ? 'Edit' : 'Create'} project</Title>
		{#if loadingDialog}
			<div class="dialog-divider" />
		{/if}
		<LinearProgress bind:closed={loadingDialog} indeterminate />
		<Content id="mandatory-content">
			<Textfield
				disabled={!loadingDialog}
				label="Project Name"
				variant="outlined"
				invalid={!$projectForm.valid}
				required
				bind:value={$projectName.value}
				input$placeholder="Ex: Project 1"
				style="width: 100%"
				helperLine$style="width: 100%;"
			/>
			{#if $projectForm.hasError('projectName.required')}
				<span class="invalid-field">Project name is required</span>
			{/if}
		</Content>

		<Actions>
			<Button action="close">
				<Label>Close</Label>
			</Button>
			<Button color="secondary" variant="unelevated" action="submit" disabled={!$projectForm.valid}>
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
