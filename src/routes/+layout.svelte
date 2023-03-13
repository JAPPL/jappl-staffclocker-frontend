<script lang="ts">
	import { onMount } from 'svelte';
	import { firebaseAuth } from '../core/services/authentication/firebase-authentication';

	onMount(() => {
		firebaseAuth.initApp();
	});
</script>

<slot />

<style>
	:root {
		background-color: rgb(196, 220, 243);
	}
</style>
