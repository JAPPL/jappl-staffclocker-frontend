<script lang="ts">
	import { userStore } from '../../../store/user';
	import Button, { Label } from '@smui/button';
	import toast from 'svelte-french-toast';
	import { goto } from '$app/navigation';
	import type { ErrorResponse } from '../../../interface/error-response';

	export let totalHour = 0;

	async function logout() {
		await fetch('/auth/session', {
			method: 'DELETE'
		}).then(async (response: Response) => {
			if (response.ok) {
				toast.success('Logout successfully.');
				localStorage.clear();
				await goto('/login');
			} else if (response.status == 500) {
				toast.error('Internal server error');
			} else {
				const error: ErrorResponse = await response.json();
				toast.error(error.detail);
			}
		});
	}
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
			on:click={() => {
				logout();
			}}
			variant="unelevated"
			class="button-shaped-round"
		>
			<Label>Log Out</Label>
		</Button>
	</div>
</div>

<style>
</style>
