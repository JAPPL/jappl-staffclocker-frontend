<script lang="ts">
	import Button, { Label } from '@smui/button';
	import Card from '@smui/card';
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

<div class="full-screen-size">
	<img src="src/lib/images/logo-dark.png" class="logo-size" alt="logo" />
	<div class="center">
		<div class="login">
			<div class="login-card-content">
				<h1 style="margin-bottom: 15px;">Welcome to JAPPL</h1>

				<p>Options</p>

				<div class="test">
					<Button
						style="
							background-color: #FF6B6B;
							border-radius: 30px;
							width: 100%
						"
						variant="raised"
						ripple={false}
						on:click={login}
					>
						<img src="src/lib/images/google.png" class="google-logo" alt="logo" />
						<Label>Login with Google</Label>
					</Button>
				</div>

				<p style="margin-bottom: 0">if you can not login, please contact admin.</p>
			</div>
		</div>
	</div>

	<BottomAppBar bind:this={bottomAppBar}>
		<Section>
			<!--			 <IconButton class="material-icons">menu</IconButton>-->
			<p>Contact | About</p>
		</Section>
	</BottomAppBar>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;800&display=swap');

	.full-screen-size {
		min-height: 90vh;
	}

	.logo-size {
		width: 137px;
		height: 100%;
	}

	.google-logo {
		width: 25px;
		height: fit-content;
		margin-right: 10px;
	}

	.center {
		display: flex;
		justify-content: center;
	}

	.login-card-content {
		margin: 60px 10% 10% 10%;
	}

	p {
		color: #ffffff;
		font-family: 'Inter', sans-serif;
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
		min-height: 270px;
		min-width: 400px;
	}
</style>
