<script lang="ts">
	import { locals } from '../../lib/store/user.js';
</script>

<div class="login centered">
	<p>This is protected page. {$locals?.token?.email}</p>
</div>

<style>
</style>
