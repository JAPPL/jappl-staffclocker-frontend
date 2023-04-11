<script lang="ts">
	import { Toaster } from 'svelte-french-toast';
</script>

<Toaster />
<img src="logo-dark.png" class="logo-size" alt="logo" />
<slot />

<style>
	.logo-size {
		width: 137px;
		margin: 8px;
	}
</style>
