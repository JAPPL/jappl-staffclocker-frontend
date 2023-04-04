<script lang="ts">
	import type { TimeLog } from '../../../interface/timelog';
	import type { ErrorResponse } from '../../../interface/error-response';
	import Button, { Label } from '@smui/button';
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import toast from 'svelte-french-toast';
	import { userStore } from '../../../store/user';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	export let openApproveDialog = false;
	export let selectedTimeLogForApprove: TimeLog | undefined;

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

	async function approveTimeLog(timelog: TimeLog | undefined) {
		if (timelog) {
			const token: string = $userStore.token || '';
			await fetch(`api/timelog/approve/${timelog.id}`, {
				method: 'PATCH',
				headers: new Headers({ Authorization: `Bearer ${token}` })
			}).then(async (response: Response) => {
				if (!response.ok) {
					await handleErrorResponse(response);
				} else {
					toast.success(`Approved timelog ${timelog.id} successfully.`);
					dispatch('loadTimeLog', true);
				}
				selectedTimeLogForApprove = undefined;
			});
		} else {
			toast.error('No timelog selected.');
		}
	}
</script>

<div>
	<Dialog
		bind:open={openApproveDialog}
		scrimClickAction=""
		escapeKeyAction=""
		aria-labelledby="mandatory-title"
		aria-describedby="mandatory-content"
	>
		<Title id="mandatory-title">TimeLog Approve Confirmation</Title>
		<Content id="mandatory-content">Are you sure to approve this timelog?</Content>
		<Actions>
			<Button action="close">
				<Label>Close</Label>
			</Button>
			<Button
				color="secondary"
				variant="unelevated"
				on:click={approveTimeLog(selectedTimeLogForApprove)}
			>
				<Label>Confirm</Label>
			</Button>
		</Actions>
	</Dialog>
</div>

<style lang="css">
</style>
