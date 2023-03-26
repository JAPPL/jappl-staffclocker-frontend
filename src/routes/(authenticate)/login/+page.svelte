<script lang="ts">
	import Button, { Label } from '@smui/button';
	import BottomAppBar, { Section } from '@smui-extra/bottom-app-bar';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import { loginWithGoogle } from '../../../lib/firebase/firebase-client';
	import { goto } from '$app/navigation';
	import type { ErrorResponse } from '../../../lib/interface/error-response';
	import type { DecodedIdToken } from 'firebase-admin/auth';
	import { setUser } from '../../../lib/store/user';
	import type { User } from 'firebase/auth';
	import toast from 'svelte-french-toast';
	let bottomAppBar: BottomAppBar;
	let loading = false;

	async function login() {
		loading = true;
		const userCredential: User | null = await loginWithGoogle();
		const token: string = await userCredential?.getIdToken();
		const name: string = userCredential?.displayName || '';
		await fetch('/auth/session', {
			method: 'POST',
			headers: new Headers({ Authorization: `Bearer ${token}` })
		})
			.then(async (response: Response) => {
				if (response.ok) {
					toast.success('Login successfully.');
					const user: DecodedIdToken | null = await response.json();
					setUser({
						name: name,
						email: user?.email || '',
						picture: user?.picture || '',
						token: token
					});
					await goto('/timelog');
				} else if (response.status == 500) {
					toast.error('Internal server error');
				} else {
					const error: ErrorResponse = await response.json();
					toast.error(error.detail);
				}
			})
			.finally(() => {
				loading = false;
			});
	}
</script>

<div class="full-screen-size">
	<div class="center">
		<div class="login">
			<div class="login-card-content">
				<LayoutGrid style="padding: 0">
					<Cell span={9}>
						<h1 style="margin-bottom: 15px;">Welcome to JAPPL</h1>
					</Cell>
					<Cell span={3}>
						<img src="src/lib/images/user.png" class="user-image-size" alt="user" />
					</Cell>
				</LayoutGrid>

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
						disabled={loading}
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
</div>
<div class="bottom-app-margin">
	<BottomAppBar bind:this={bottomAppBar}>
		<Section>
			<Button variant="raised">
				<Label>Contact</Label>
			</Button>
			<div class="divider" />
			<Button variant="raised">
				<Label>About</Label>
			</Button>
		</Section>
	</BottomAppBar>
</div>

<style>
	.full-screen-size {
		min-height: 80vh;
		position: relative;
	}

	.divider {
		margin: 0 4px;
		border-left: 1px solid white;
		height: 35px;
	}

	.bottom-app-margin :global(.smui-bottom-app-bar > .smui-bottom-app-bar__section) {
		padding: 13px;
	}

	.user-image-size {
		height: 70px;
	}

	.google-logo {
		width: 25px;
		height: fit-content;
		margin-right: 10px;
	}

	.center {
		position: absolute;
		top: 45%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	p {
		color: #ffffff;
	}

	h1 {
		color: #ffffff;
		font-size: 32px;
	}

	.login {
		border-radius: 30px;
		background-color: #130f42;
		width: 410px;
		padding: 30px;
	}
</style>
