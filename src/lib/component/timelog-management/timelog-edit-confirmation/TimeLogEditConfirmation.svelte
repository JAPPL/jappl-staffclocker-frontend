<script lang="ts">
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import LinearProgress from '@smui/linear-progress';
	import Textfield from '@smui/textfield';
	import Button, { Label } from '@smui/button';
	import { form, field } from 'svelte-forms';
	import Select, { Option } from '@smui/select';
	import { required, min } from 'svelte-forms/validators';
	import { userStore } from '../../../store/user';
	import type { ErrorResponse } from '../../../interface/error-response';
	import toast from 'svelte-french-toast';
	import { createEventDispatcher } from 'svelte';
	import type { Project } from '../../../interface/project';

	const dispatch = createEventDispatcher();

	export let loadingDialog = true;
	export let id = field('id', 0);
	export let hourSpent = field('hourSpent', 0, [min(1)]);
	export let message = field('message', '', [required()]);
	export let projectId = field('projectId', 0, [min(1)]);
	export let timeLogForm = form(message, hourSpent, id, projectId);
	export let openEditDialog = false;
	export let projectOptions: Project[] = [];

	let hourOptions: number[] = Array.from(Array(8).keys()).map((x) => x + 1);

	async function closeHandler(e: CustomEvent<{ action: string }>): Promise<void> {
		switch (e.detail.action) {
			case 'submit':
				openEditDialog = true;
				await submitTimeLogForm();
				break;
			case 'close':
				$message.value = '';
				$hourSpent.value = 0;
				$projectId.value = 0;
				$id.value = 0;
		}
	}

	async function handleErrorResponse(response: Response): Promise<void> {
		if (response.status == 400) {
			toast.error('Message is not given.');
		} else if (response.status == 500) {
			toast.error('Internal server error.');
		} else if (response.status == 401) {
			toast.error('Unauthorized. You are not allowed to edit this timelog.');
		} else {
			let err: ErrorResponse = await response.json();
			toast.error(err.detail);
		}
	}

	async function editTimeLog(): Promise<void> {
		loadingDialog = false;
		const token: string = $userStore.token || '';
		let formData: FormData = new FormData();
		formData.append('message', $message.value);
		formData.append('hour_spent', $hourSpent.value.toString());
		formData.append('projectId', $projectId.value.toString());
		await fetch(`api/timelog/update/${$id.value}`, {
			method: 'PATCH',
			headers: new Headers({ Authorization: `Bearer ${token}` }),
			body: formData
		})
			.then(async (response: Response) => {
				if (!response.ok) {
					return Promise.reject(response);
				}
				dispatch('loadTimeLog', true);
				$message.value = '';
				$id.value = 0;
				$hourSpent.value = 0;
				$projectId.value = 0;
				toast.success('Edit time log successfully.');
			})
			.catch(async (errorResponse: Response) => {
				await handleErrorResponse(errorResponse);
			})
			.finally(() => {
				loadingDialog = true;
				openEditDialog = false;
			});
	}

	async function submitTimeLogForm(): Promise<void> {
		await timeLogForm.validate();
		if ($timeLogForm.valid) {
			await editTimeLog();
		}
	}
</script>

<div>
	<Dialog
		bind:open={openEditDialog}
		aria-labelledby="mandatory-title"
		aria-describedby="mandatory-content"
		scrimClickAction=""
		escapeKeyAction=""
		on:SMUIDialog:closed={closeHandler}
		surface$style="min-width: calc(50vw); max-width: calc(60vw); min-height: calc(75vh)"
	>
		<Title id="mandatory-title">Edit time log</Title>
		{#if loadingDialog}
			<div class="dialog-divider" />
		{/if}
		<LinearProgress bind:closed={loadingDialog} indeterminate />
		<Content id="mandatory-content">
			<Textfield
				disabled={!loadingDialog}
				label="Timelog Description"
				variant="outlined"
				textarea
				invalid={!$timeLogForm.valid}
				required
				bind:value={$message.value}
				input$rows={3}
				input$cols={100}
				input$placeholder="Ex: I did something today"
				input$resizable={false}
			/>
			{#if $timeLogForm.hasError('message.required')}
				<span class="invalid-field">TimeLog description is required</span>
			{/if}
			<div style="margin-top: 16px">
				<Select
					disabled={!loadingDialog}
					variant="outlined"
					key={(hour) => `${hour ? hour : 0}`}
					invalid={$timeLogForm.hasError('hourSpent.min')}
					bind:value={$hourSpent.value}
					label="Select hour spent"
					class="shaped-outlined"
				>
					<Option value={0}>Not selected</Option>
					{#each hourOptions as hour}
						<Option value={hour}>{hour}</Option>
					{/each}
				</Select>
				<Select
					disabled={!loadingDialog}
					variant="outlined"
					data-testid="project-selector"
					key={(project) => `${project ? project : 0}`}
					bind:value={$projectId.value}
					invalid={$timeLogForm.hasError('projectId.min')}
					label="Selected project"
					class="shaped-outlined"
				>
					<Option value={null}>Not selected</Option>
					{#each projectOptions as project (project.projectName)}
						<Option data-testid={project.projectName} value={project.projectId}
							>{project.projectName}</Option
						>
					{/each}
				</Select>
				{#if $timeLogForm.hasError('hourSpent.min')}
					<p class="invalid-field">Please select number hour you have spent.</p>
				{/if}
				{#if $timeLogForm.hasError('projectId.min')}
					<p class="invalid-field">Please select project.</p>
				{/if}
			</div>
		</Content>

		<Actions>
			<Button action="close">
				<Label>Close</Label>
			</Button>
			<Button color="secondary" variant="unelevated" action="submit">
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
