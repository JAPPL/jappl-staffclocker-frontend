<script lang="ts">
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import { Icon } from '@smui/common';
	import BottomAppBar, { Section } from '@smui-extra/bottom-app-bar';
	import { firebaseAuth } from '../../core/services/authentication/firebase-authentication';
	let bottomAppBar: BottomAppBar;

	async function login() {
		await firebaseAuth.loginWithGoogle();
	}
</script>

<div class="login centered">
	<div class="column" style="margin-left: 10%; margin-right: 10%;">
		<div style="margin-bottom: 15px;">
			<p>Login</p>
		</div>

		<div style="margin-bottom: 10px;">
			<p2>Email Address</p2>
		</div>

		<div class="input-field">
			<LayoutGrid>
				<Cell span={1}>
					<div class="center-stuff">
						<Icon class="material-icons">person</Icon>
					</div>
				</Cell>
				<Cell span={11}>
					<input class="center" style="border: 0; padding-top: 5px;" placeholder="Email" />
				</Cell>
			</LayoutGrid>
		</div>

		<div style="margin-bottom: 10px; margin-top: 20px;">
			<p2>Password</p2>
		</div>

		<div class="input-field">
			<LayoutGrid>
				<Cell span={1}>
					<div class="center-stuff">
						<Icon class="material-icons">key</Icon>
					</div>
				</Cell>
				<Cell span={11}>
					<input
						class="center"
						style="border: 0; padding-top: 5px;"
						placeholder="Password"
						type="password"
					/>
				</Cell>
			</LayoutGrid>
		</div>

		<button class="input-field" style="margin-top: 49.5px; background-color: #51B198;">
			<p style="font-size: 20px;">Login</p>
		</button>

		<button on:click={login} class="input-field" style="margin-top: 5px; background-color: red;">
			<p style="font-size: 20px;">Login with Google</p>
		</button>

		<div class="center-stuff register">
			<a href="/register"><u>Don't have an account? Register here</u></a>
		</div>
	</div>
</div>

<BottomAppBar bind:this={bottomAppBar} color={'primary'}>
	<Section>
		<!-- <IconButton class="material-icons">menu</IconButton> -->
		<p2 class="center-stuff" style="font-size: 90%;">Contact | About</p2>
	</Section>
</BottomAppBar>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;800&display=swap');

	.register {
		margin-top: 10px;
		color: white;
	}
	.input-field {
		background-color: white;
		width: 100%;
		height: 60px;
		border-radius: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	input:focus {
		outline: 0px solid transparent;
	}
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
	p2 {
		color: #ffffff;
		font-family: 'Inter', sans-serif;
		font-weight: 400;
		font-size: 16px;
	}

	.login {
		border-radius: 30px;
		background-color: #130f42;
		height: 459.5px;
		width: 500px;
		display: flex;
	}
	.centered {
		position: fixed;
		top: 45%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	.column {
		flex: 50%;
	}
</style>
