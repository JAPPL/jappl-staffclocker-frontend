<script lang="ts">
	import { Cell } from '@smui/layout-grid';
	import LayoutGrid from '@smui/layout-grid/src/LayoutGrid.svelte';
	import { userStore } from '../../../store/user';
	import Button from '@smui/button';

	export let totalHour = 0;
</script>

<div class="container" style="height: 100%; width: 100%; padding: 0%;">
	<LayoutGrid style="width: 100%;">
		<Cell span={6}>
			<div style="display: flex; justify-content: center; align-items: center;">
				<img src={$userStore.picture} alt="W3Schools.com" style="border-radius: 50%;" />
			</div>
		</Cell>
		<Cell span={6}>
			<div style="display: flex; justify-content: center;">
				<h2>{$userStore.name}</h2>
			</div>
		</Cell>
		<Cell span={12}>
			<div style="display: flex; align-items: top;">
				<h2>Total Hours</h2>
			</div>
		</Cell>
		<Cell span={12}>
			<div style="display: flex; justify-content: center; align-items: top;">
				<h1>{totalHour} Hr</h1>
			</div>
		</Cell>
		<Cell span={12}>
			<div style="display: flex; justify-content: center; align-items: center;">
				<Button
					color="secondary"
					on:click={() => console.log('cowagunga')}
					variant="unelevated"
					class="button-shaped-round"
				>
					<h2>Log Out</h2>
				</Button>
			</div>
		</Cell>
	</LayoutGrid>
</div>

<style>
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
