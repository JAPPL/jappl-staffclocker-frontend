<script lang="ts">
	import type { TimeLog } from '../../../interface/timelog';
	import type { ErrorResponse } from '../../../interface/error-response';
	import Button, { Label } from '@smui/button';
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import toast from 'svelte-french-toast';
	import { userStore } from '../../../store/user';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	export let openDeleteDialog = false;
	export let selectedTimeLogForDelete: TimeLog | undefined;

	async function deleteTimeLog(timelog: TimeLog | undefined) {
		if (timelog) {
			const token: string = $userStore.token || '';
			await fetch(`api/timelog/delete/${timelog.id}`, {
				method: 'DELETE',
				headers: new Headers({ Authorization: `Bearer ${token}` })
			}).then(async (response: Response) => {
				if (!response.ok) {
					const error: ErrorResponse = await response.json();
					toast.error(error.detail);
				} else {
					toast.success(`Delete timelog ${timelog.id} successfully.`);
					dispatch('loadTimeLog', true);
				}
				selectedTimeLogForDelete = undefined;
			});
		} else {
			toast.error('No timelog selected.');
		}
	}
</script>

<div>
	<Dialog
		bind:open={openDeleteDialog}
		scrimClickAction=""
		escapeKeyAction=""
		aria-labelledby="mandatory-title"
		aria-describedby="mandatory-content"
	>
		<Title id="mandatory-title">TimeLog Delete Confirmation</Title>
		<Content id="mandatory-content">Are you sure to delete this timelog?</Content>
		<Actions>
			<Button action="close">
				<Label>Close</Label>
			</Button>
			<Button
				color="secondary"
				variant="unelevated"
				on:click={deleteTimeLog(selectedTimeLogForDelete)}
			>
				<Label>Confirm</Label>
			</Button>
		</Actions>
	</Dialog>
</div>

<style lang="css">
</style>
