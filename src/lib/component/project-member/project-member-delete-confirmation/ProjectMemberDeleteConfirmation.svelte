<script lang="ts">
	import type { ErrorResponse } from '../../../interface/error-response';
	import Button, { Label } from '@smui/button';
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import toast from 'svelte-french-toast';
	import { userStore } from '../../../store/user.js';
	import { createEventDispatcher } from 'svelte';
	import type { ProjectMember } from '../../../interface/project-member';

	const dispatch = createEventDispatcher();
	export let openDeleteDialog = false;
	export let selectedProjectMemberForDelete: ProjectMember | undefined;

	async function deleteProjectMember(projectMember: ProjectMember | undefined) {
		if (projectMember) {
			const token: string = $userStore.token || '';
			await fetch(`api/project-member/delete/${projectMember.projectMemberId}`, {
				method: 'DELETE',
				headers: new Headers({ Authorization: `Bearer ${token}` })
			}).then(async (response: Response) => {
				if (!response.ok) {
					const error: ErrorResponse = await response.json();
					toast.error(error.detail);
				} else {
					toast.success(
						`Delete member ${projectMember.user.firstName} in project ${projectMember.project.projectName} successfully.`
					);
					dispatch('loadMember', true);
				}
				selectedProjectMemberForDelete = undefined;
			});
		} else {
			toast.error('No project member selected.');
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
		<Title id="mandatory-title" data-testid="mandatory-title-delete"
			>Project Member Delete Confirmation</Title
		>
		<Content id="mandatory-content" data-testid="mandatory-content-delete">
			Are you sure to delete user
			{selectedProjectMemberForDelete?.user.firstName || 'N/A'}
			{selectedProjectMemberForDelete?.user.lastName || 'N/A'}
			in project {selectedProjectMemberForDelete?.project.projectName || 'N/A'}?
		</Content>
		<Actions>
			<Button action="close" data-testid="delete-close-button">
				<Label>Close</Label>
			</Button>
			<Button
				color="secondary"
				variant="unelevated"
				data-testid="delete-confirm-button"
				on:click={deleteProjectMember(selectedProjectMemberForDelete)}
			>
				<Label>Confirm</Label>
			</Button>
		</Actions>
	</Dialog>
</div>

<style lang="css">
</style>
