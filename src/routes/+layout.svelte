<script lang="ts">
	import { Toaster } from 'svelte-french-toast';
	import Tooltip, { Wrapper } from '@smui/tooltip';
	import Drawer, { AppContent, Content } from '@smui/drawer';
	import List, { Item } from '@smui/list';
	import { Icon } from '@smui/common';

	let open = true;
</script>

<Toaster />
<div>
	<Drawer variant="dismissible" bind:open>
		<div class="center">
			<img src="src/lib/images/logo-without-text.png" class="logo-size" alt="logo" />
		</div>
		<Content>
			<List>
				<Item>
					<Wrapper>
						<Icon style="color: white" class="material-icons">home</Icon>
						<Tooltip xPos="start">Dashboard.</Tooltip>
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
	* :global(.mdc-drawer) {
		height: 95%;
		top: 10px;
		left: 10px;
		right: 10px;
		bottom: 100px;
		padding-top: 8px;
		padding-bottom: 8px;
		border-radius: 50px;
		background: #130f42;
		width: 57px;
	}

	* :global(.mdc-drawer-app-content) {
		margin-left: 80px !important;
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
		padding: 16px;
		height: 100%;
		box-sizing: border-box;
	}
</style>
