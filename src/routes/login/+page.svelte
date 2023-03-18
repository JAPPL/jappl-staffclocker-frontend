<script lang="ts">
	import Button from '@smui/button';
	import BottomAppBar, { Section } from '@smui-extra/bottom-app-bar';
	import { loginWithGoogle } from '../../lib/firebase/firebase-client';
	import { goto } from '$app/navigation';
	import type { ErrorResponse } from '../../lib/interface/error-response';
	import type { DecodedIdToken } from 'firebase-admin/auth';
	import { setUser } from '../../lib/store/user';
	import type { User } from 'firebase/auth';
	let bottomAppBar: BottomAppBar;

	async function login() {
		const userCredential: User | null = await loginWithGoogle();
		const token: string = await userCredential?.getIdToken();
		const name: string = userCredential?.displayName || '';
		await fetch('/auth/session', {
			method: 'POST',
			headers: new Headers({ Authorization: `Bearer ${token}` })
		}).then(async (response: Response) => {
			if (response.ok) {
				const user: DecodedIdToken | null = await response.json();
				setUser({
					name: name,
					email: user?.email || '',
					picture: user?.picture || ''
				});
				await goto('/timelog');
			} else if (response.status == 500) {
				console.log('internal server error');
			} else {
				const test: ErrorResponse = await response.json();
				console.log(test.detail);
			}
		});
	}
</script>

<div>
	<div class="login centered">
		<div class="column" style="margin-top: 50px; margin-left: 10%; margin-right: 10%;">
			<h1 style="margin-bottom: 15px;">Welcome to JAPPL</h1>

			<p>Options</p>

			<button on:click={login} class="input-field" style="margin-top: 5px; background-color: red;">
				<p style="font-size: 20px;">Login with Google</p>
			</button>

			<p>if you can not login, please contact admin.</p>
		</div>
	</div>

	<Button variant="raised" class="button-shaped-round">Login with Google</Button>

	<BottomAppBar bind:this={bottomAppBar}>
		<Section>
			<!-- <IconButton class="material-icons">menu</IconButton> -->
			<p class="center-stuff" style="font-size: 90%;">Contact | About</p>
		</Section>
	</BottomAppBar>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;800&display=swap');

	.input-field {
		background-color: white;
		width: 100%;
		height: 60px;
		border-radius: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.center-stuff {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	p {
		color: #ffffff;
		font-family: 'Inter', sans-serif;
		/*font-style: normal;*/
		font-weight: 400;
	}

	h1 {
		color: #ffffff;
		font-family: 'Inter', sans-serif;
		font-weight: 800;
		font-size: 32px;
	}

	.login {
		border-radius: 30px;
		background-color: #130f42;
		min-height: 300px;
		min-width: 500px;
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
