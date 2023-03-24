<script lang="ts">
	import { Toaster } from 'svelte-french-toast';
	import Tooltip, { Wrapper } from '@smui/tooltip';
	import Drawer, { AppContent, Content } from '@smui/drawer';
	import List, { Item } from '@smui/list';
	import Icon from 'mdi-svelte';
	import {
		mdiHome,
		mdiCheckCircleOutline,
		mdiFolderEdit,
		mdiTimerSandComplete,
		mdiAccountEdit
	} from '@mdi/js';
	import type { LayoutMenu } from '../../lib/interface/layout-menu';
	import { goto } from '$app/navigation';

	let active = '';

	let menus: LayoutMenu[] = [
		{
			icon: mdiHome,
			path: '/',
			label: 'Dashboard',
			value: 'home'
		},
		{
			icon: mdiCheckCircleOutline,
			path: '/paid',
			label: 'Paid time log',
			value: 'paid'
		},
		{
			icon: mdiFolderEdit,
			path: '/project-management',
			label: 'Project Management',
			value: 'pm'
		},
		{
			icon: mdiTimerSandComplete,
			path: '/timelog',
			label: 'Time Log Management',
			value: 'tm'
		},
		{
			icon: mdiAccountEdit,
			path: '/member-management',
			label: 'Project Member Management',
			value: 'pmm'
		}
	];

	let open = true;

	function redirect(path: string, value: string): void {
		active = value;
		goto(path);
	}
</script>

<Toaster />
<div class="container">
	<Drawer variant="dismissible" bind:open>
		<div class="center">
			<img src="src/lib/images/logo-without-text.png" class="logo-size" alt="logo" />
		</div>
		<Content>
			<List>
				{#each menus as { path, icon, value, label }, index}
					<Wrapper>
						<Item
							style="display: flex; justify-content: center"
							activated={active === value}
							on:click={() => redirect(path, value)}
						>
							<Icon path={icon} color="white" />
						</Item>
						<Tooltip>{label}</Tooltip>
					</Wrapper>
				{/each}
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
		margin-left: 7% !important;
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
