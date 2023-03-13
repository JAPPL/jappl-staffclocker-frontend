<script lang="ts">
	import { onMount } from 'svelte';
	import { FirebaseAuthentication } from '../core/services/authentication/firebase-authentication';

	onMount(() => {
		const firebaseAuth: FirebaseAuthentication = new FirebaseAuthentication();
		firebaseAuth.initApp();
	});
</script>

<slot />

<style>
	:root {
		background-color: rgb(196, 220, 243);
	}
</style>
