<script lang="ts">
	import { userStore } from '../../../lib/store/user.js';
</script>

<div class="login centered">
	<p>This is protected page. {$userStore.email}</p>
</div>

<style>
</style>
