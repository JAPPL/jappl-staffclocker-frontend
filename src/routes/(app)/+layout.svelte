<script>
	import { Toaster } from 'svelte-french-toast';
	import Tooltip, { Wrapper } from '@smui/tooltip';
	import Drawer, { AppContent, Content } from '@smui/drawer';
	import List, { Item } from '@smui/list';
	import Icon from 'mdi-svelte';
	import { mdiHome } from '@mdi/js';

	let open = true;
</script>

<Toaster />
<div class="container">
	<Drawer variant="dismissible" bind:open>
		<div class="center">
			<img src="src/lib/images/logo-without-text.png" class="logo-size" alt="logo" />
		</div>
		<Content>
			<List>
				<Item style="display: flex; justify-content: center">
					<Wrapper>
						<Icon path={mdiHome} color="white" />
						<Tooltip xPos="start">Dashboard</Tooltip>
					</Wrapper>
				</Item>
			</List>
		</Content>
	</Drawer>

	<AppContent>
		<main class="main-content">
			<slot />
		</main>
	</AppContent>
</div>

<style>
	.container :global(.mdc-drawer) {
		top: 0;
		padding-top: 8px;
		padding-bottom: 8px;
		background: #130f42;
		width: 70px;
	}

	.container:global(.mdc-drawer .mdc-deprecated-list-item__text) {
		color: white;
	}

	.container :global(.mdc-drawer-app-content) {
		margin-left: 70px !important;
	}

	.logo-size {
		width: 40px;
	}

	.center {
		display: flex;
		justify-content: center;
	}
	.main-content {
		overflow: auto;
		height: 100vh;
		box-sizing: border-box;
	}
	/* div {
		border: 3px solid black;
	}
	div.figure {
		border: 3px solid blue;
		display: inline-block;
	} */
</style>
