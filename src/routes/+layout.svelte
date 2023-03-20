<script lang="ts">
	import { Toaster } from 'svelte-french-toast';
	import Drawer, { AppContent, Content } from '@smui/drawer';
	import List, { Item, Text } from '@smui/list';

	let open = true;
</script>

<Toaster />
<div>
	<Drawer color="primary" variant="dismissible" bind:open>
		<div class="center">
			<img src="src/lib/images/logo-without-text.png" class="logo-size" alt="logo" />
		</div>
		<Content>
			<List>
				<Item>
					<Text>Gray Kittens</Text>
				</Item>
				<Item>
					<Text>A Space Rocket</Text>
				</Item>
				<Item>
					<Text>100 Pounds of Gravel</Text>
				</Item>
				<Item>
					<Text>All of the Shrimp</Text>
				</Item>
				<Item>
					<Text>Gray Kittens</Text>
				</Item>
				<Item>
					<Text>A Space Rocket</Text>
				</Item>
				<Item>
					<Text>100 Pounds of Gravel</Text>
				</Item>
				<Item>
					<Text>All of the Shrimp</Text>
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
		width: 60px;
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
