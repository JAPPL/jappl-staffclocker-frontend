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
	import type { TimeLog } from '../../../interface/timelog';

	const dispatch = createEventDispatcher();

	export let loadingDialog = true;
	export let id = field('id', 0);
	export let hour_spent = field('hour_spent', 0, [required()]);
	export let message = field('message', '', [required()]);
	export let projectId = field('projectId', 0);
	export let timeLogForm = form(message, hour_spent, id, projectId);
	export let openEditDialog = false;
	export let selectedTimeLogForEdit: TimeLog | undefined;

	async function closeHandler(e: CustomEvent<{ action: string }>): Promise<void> {
		switch (e.detail.action) {
			case 'submit':
				openEditDialog = false;
				await submitTimeLogForm();
				break;
			case 'close':
				$message.value = '';
				$hour_spent.value = 0;
				$projectId.value = 0;
				openEditDialog = false;
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
		formData.append('hour_spent', $hour_spent.value.toString());
		formData.append('projectId', $projectId.value.toString());
		console.log(formData);
		await fetch(`api/timelog/update/${(selectedTimeLogForEdit as TimeLog).projectId.projectId}`, {
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
				$hour_spent.value = 0;
				$projectId.value = 0;
				toast.success('Edit timelog successfully.');
			})
			.catch(async (errorResponse: Response) => {
				await handleErrorResponse(errorResponse);
			})
			.finally(() => (loadingDialog = true));
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
		surface$style="min-width: calc(100vw - 60vw); max-width: calc(100vw - 100px);"
	>
		<Title id="mandatory-title">timelog</Title>
		{#if loadingDialog}
			<div class="dialog-divider" />
		{/if}
		<LinearProgress bind:closed={loadingDialog} indeterminate />
		<Content id="mandatory-content">
			<Textfield
				disabled={!loadingDialog}
				label="Timelog Description"
				variant="outlined"
				invalid={!$timeLogForm.valid}
				required
				bind:value={$message.value}
				input$placeholder="Ex: I did something today"
				style="width: 100%"
				helperLine$style="width: 100%;"
			/>
			{#if $timeLogForm.hasError('message.required')}
				<span class="invalid-field">TimeLog description is required</span>
			{/if}
		</Content>
		<Content id="mandatory-content">
			<Textfield
				disabled={!loadingDialog}
				label="Timelog Hours Spent"
				variant="outlined"
				required
				invalid={!$timeLogForm.valid}
				bind:value={$hour_spent.value}
				input$placeholder="Ex: 8 hours"
				style="width: 100%"
				helperLine$style="width: 100%;"
			/>
			{#if $timeLogForm.hasError('hour_spent.required')}
				<span class="invalid-field">TimeLog hours spent is required</span>
			{/if}
		</Content>

		<Actions>
			<Button action="close">
				<Label>Close</Label>
			</Button>
			<Button color="secondary" variant="unelevated" action="submit" disabled={!$timeLogForm.valid}>
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
