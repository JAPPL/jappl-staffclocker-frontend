<script lang="ts">
	import { userStore } from '../../../store/user';
	import Button, { Label } from '@smui/button';

	export let totalHour = 0;
</script>

<div>
	<div style="display: flex; justify-content: center; align-items: center;">
		<img src={$userStore.picture} alt="W3Schools.com" style="border-radius: 50%; width: 80px" />
	</div>
	<h2>{$userStore.name}</h2>
	<p>Total Hours: {totalHour} Hours</p>
	<div style="display: flex; justify-content: flex-end;">
		<Button
			color="secondary"
			on:click={() => console.log('cowagunga')}
			variant="unelevated"
			class="button-shaped-round"
		>
			<Label>Log Out</Label>
		</Button>
	</div>
</div>

<style>
</style>
