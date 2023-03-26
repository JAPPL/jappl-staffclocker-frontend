<script lang="ts">
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import LinearProgress from '@smui/linear-progress';
	import Textfield from '@smui/textfield';
	import Button, { Label } from '@smui/button';

	export let loadingDialog = true;
	export let openCreateDialog = false;
	export let projectName = '';

	async function closeHandler(e: CustomEvent<{ action: string }>) {
		switch (e.detail.action) {
			case 'submit':
				openCreateDialog = true;
				await submitProjectForm();
				break;
			case 'close':
				projectName = '';
		}
	}

	function delay(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	async function submitProjectForm(): Promise<void> {
		loadingDialog = false;
		await delay(3000);
		loadingDialog = true;
		// openCreateDialog = false;
	}
</script>

<Dialog
	bind:open={openCreateDialog}
	aria-labelledby="mandatory-title"
	aria-describedby="mandatory-content"
	scrimClickAction=""
	escapeKeyAction=""
	on:SMUIDialog:closed={closeHandler}
	surface$style="min-width: calc(100vw - 60vw); max-width: calc(100vw - 100px);"
>
	<Title id="mandatory-title">Create project</Title>
	{#if loadingDialog}
		<div class="dialog-divider" />
	{/if}
	<LinearProgress bind:closed={loadingDialog} indeterminate />
	<Content id="mandatory-content">
		<Textfield
			disabled={!loadingDialog}
			label="Project Name"
			variant="outlined"
			required
			bind:value={projectName}
			input$placeholder="Ex: Project 1"
			style="width: 100%"
			helperLine$style="width: 100%;"
		/>
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

<style lang="css">
	.dialog-divider {
		margin: 2px 0;
		border-bottom: 1px solid #bfbfbf;
	}
</style>
