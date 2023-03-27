<script lang="ts">
	import type { Project } from '../../../interface/project';
	import type { ErrorResponse } from '../../../interface/error-response';
	import Button, { Label } from '@smui/button';
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import toast from 'svelte-french-toast';
	import { userStore } from '../../../store/user.js';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	export let openDeleteDialog = false;
	export let selectedProjectForDelete: Project | undefined;

	async function deleteProject(project: Project | undefined) {
		if (project) {
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
					dispatch('loadProject', true);
				}
				selectedProjectForDelete = undefined;
			});
		} else {
			toast.error('No project selected.');
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
</style>
