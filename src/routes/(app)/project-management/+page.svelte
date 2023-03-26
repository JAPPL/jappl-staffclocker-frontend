<script lang="ts">
	import Card from '@smui/card';
	import Icon from 'mdi-svelte';
	import ProjectDialog from './ProjectDialog.svelte';
	import LinearProgress from '@smui/linear-progress';
	import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
	import { mdiFolderPlus } from '@mdi/js';
	import Button, { Label } from '@smui/button';

	let loading = false;
	let loadingDialog = true;
	let openCreateDialog = true;

	function toggleDialog(): void {
		openCreateDialog = !openCreateDialog;
	}
</script>

<div class="container">
	<Card style="padding: 20px">
		<div style="display: flex; justify-content: space-between">
			<h2 class="mdc-typography--headline6" style="margin: 0;">Project Management</h2>
			<Button disabled={!loading} color="secondary" variant="unelevated" on:click={toggleDialog}>
				<Icon path={mdiFolderPlus} />
				<Label style="margin-left: 5px">Create project</Label>
			</Button>
		</div>
		<div class="divider" />
		<DataTable table$aria-label="Project List" style="width: 100%;">
			<Head>
				<Row>
					<Cell numeric>ID</Cell>
					<Cell style="width: 100%;">Name</Cell>
					<Cell />
					<Cell />
				</Row>
			</Head>
			<Body>
				<!--{#each items as item (item.id)}-->
				<!--	<Row>-->
				<!--		<Cell numeric>{item.id}</Cell>-->
				<!--		<Cell>{item.name}</Cell>-->
				<!--		<Cell>{item.username}</Cell>-->
				<!--		<Cell>{item.email}</Cell>-->
				<!--	</Row>-->
				<!--{/each}-->
			</Body>

			<LinearProgress
				indeterminate
				bind:closed={loading}
				aria-label="Data is being loaded..."
				slot="progress"
			/>
		</DataTable>
	</Card>

	<ProjectDialog bind:loadingDialog bind:openCreateDialog />
</div>

<style lang="css">
	.container:global(.mdc-card) {
		padding: 20px;
	}

	.dialog-divider {
		margin: 2px 0;
		border-bottom: 1px solid #bfbfbf;
	}

	.divider {
		margin: 16px 0;
		border-bottom: 1px solid #bfbfbf;
	}
</style>
