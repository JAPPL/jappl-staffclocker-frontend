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
			path: '/paid-timelog',
			label: 'Paid time log',
			value: 'paid'
		},
		{
			icon: mdiTimerSandComplete,
			path: '/timelog-management',
			label: 'Time Log Management',
			value: 'tm'
		},
		{
			icon: mdiFolderEdit,
			path: '/project-management',
			label: 'Project Management',
			value: 'pm'
		},
		{
			icon: mdiAccountEdit,
			path: '/',
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
		<Content class="test">
			<List>
				{#each menus as { path, icon, value, label }, index}
					<Wrapper>
						<Item
							style={`display: flex; justify-content: center; ${
								active === value ? 'background-color: #51b198;' : ''
							}`}
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
		/* padding: 30px 30px 30px 0; */
		margin: 0%;
		box-sizing: border-box;
	}
</style>
