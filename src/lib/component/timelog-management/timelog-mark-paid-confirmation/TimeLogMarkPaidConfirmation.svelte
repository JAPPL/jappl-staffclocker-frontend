<script lang="ts">
	import type { TimeLog } from '../../../interface/timelog';
	import type { ErrorResponse } from '../../../interface/error-response';
	import Button, { Label } from '@smui/button';
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import toast from 'svelte-french-toast';
	import { userStore } from '../../../store/user';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	export let openMarkPaidDialog = false;
	export let selectedTimeLogForMarkPaid: TimeLog | undefined;

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

	async function markTimeLogPaid(timelog: TimeLog | undefined) {
		if (timelog) {
			const token: string = $userStore.token || '';
			await fetch(`api/timelog/mark_as_paid/${timelog.id}`, {
				method: 'PATCH',
				headers: new Headers({ Authorization: `Bearer ${token}` })
			}).then(async (response: Response) => {
				if (!response.ok) {
					await handleErrorResponse(response);
				} else {
					toast.success(`Mark timelog ${timelog.id} as Paid successfully.`);
					dispatch('loadTimeLog', true);
				}
				selectedTimeLogForMarkPaid = undefined;
			});
		} else {
			toast.error('No timelog selected.');
		}
	}
</script>

<div>
	<Dialog
		bind:open={openMarkPaidDialog}
		scrimClickAction=""
		escapeKeyAction=""
		aria-labelledby="mandatory-title"
		aria-describedby="mandatory-content"
	>
		<Title id="mandatory-title" data-testid="mandatory-title-mark-paid"
			>TimeLog Mark as Paid Confirmation</Title
		>
		<Content id="mandatory-content" data-testid="mandatory-content-mark-paid"
			>Are you sure to mark this timelog as paid?</Content
		>
		<Actions>
			<Button action="close" data-testid="mark-paid-close-button">
				<Label>Close</Label>
			</Button>
			<Button
				color="secondary"
				variant="unelevated"
				data-testid="mark-paid-confirm-button"
				on:click={markTimeLogPaid(selectedTimeLogForMarkPaid)}
			>
				<Label>Confirm</Label>
			</Button>
		</Actions>
	</Dialog>
</div>

<style lang="css">
</style>
