<script lang="ts">
	import BottomAppBar, { Section } from '@smui-extra/bottom-app-bar';
	let bottomAppBar: BottomAppBar;
</script>

<div class="login centered">
	<p>This is protected page.</p>
</div>

<BottomAppBar bind:this={bottomAppBar} color={'primary'}>
	<Section>
		<!-- <IconButton class="material-icons">menu</IconButton> -->
		<p2 class="center-stuff" style="font-size: 90%;">Contact | About</p2>
	</Section>
</BottomAppBar>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;800&display=swap');

	.center-stuff {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	p {
		color: #ffffff;
		font-family: 'Inter', sans-serif;
		font-weight: 800;
		font-size: 32px;
	}

	.login {
		border-radius: 30px;
		background-color: #130f42;
		height: 575px;
		width: 500px;
		display: flex;
	}
	.centered {
		position: fixed;
		top: 45%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
