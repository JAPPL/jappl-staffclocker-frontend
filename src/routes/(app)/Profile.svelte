<script>
	import { Cell } from '@smui/layout-grid';
	import LayoutGrid from '@smui/layout-grid/src/LayoutGrid.svelte';
</script>

<div class="container" style="height: 100%; width: 100%; padding: 0%; border: 2px solid black;">
	<h>This will display profile</h>
	<LayoutGrid style="width: 100%;">
		<Cell span={6}>
			<div class="rcorners1">Yes</div>
		</Cell>
		<Cell span={6}>
			<div class="rcorners1">Yes</div>
		</Cell>
	</LayoutGrid>
</div>

<style>
	.rcorners1 {
		margin-bottom: 30px;
		border-radius: 7px;
		border: 2px solid #130f42;
		opacity: 55%;
		flex-grow: 1;
	}
	.container :global(.mdc-layout-grid) {
		padding: 0px;
		height: 100%;
	}
	.container :global(.mdc-layout-grid__inner) {
		padding: 0%;
		margin: 0%;
		height: 100%;
	}
</style>
