<script lang="ts">
	import ClockYourTime from '../../lib/component/dashboard/clock-your-time/ClockYourTime.svelte';
	import Profile from '../../lib/component/dashboard/profile/Profile.svelte';
	import TimeLogList from '../../lib/component/dashboard/time-log-list/TimeLogList.svelte';
	import Card from '@smui/card';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import type { Project } from '../../lib/interface/project';
	import { userStore } from '../../lib/store/user';
	import { onMount } from 'svelte';
	import toast from 'svelte-french-toast';
	import type { ErrorResponse } from '../../lib/interface/error-response';
	import type { TimeLog } from '../../lib/interface/timelog';

	let allProjects: Project[] = [];
	let allTimeLog: TimeLog[] = [];
	let filteredTimeLog: TimeLog[] = [];
	let loadingProject = false;
	let loadingTimelog = true;

	onMount(async () => {
		await loadProject();
		await loadTimeLog();
	});

	async function handleErrorResponse(response: Response): Promise<void> {
		if (response.status == 500) {
			toast.error('Internal server error.');
		} else {
			let err: ErrorResponse = await response.json();
			toast.error(err.detail);
		}
	}

	async function loadProject(): Promise<void> {
		loadingProject = true;
		const token: string = $userStore.token || '';
		await fetch('api/project/', {
			method: 'GET',
			headers: new Headers({ Authorization: `Bearer ${token}` })
		})
			.then(async (response: Response) => {
				if (!response.ok) {
					return Promise.reject(response);
				} else {
					allProjects = await response.json();
					loadingProject = false;
				}
			})
			.catch((response: Response) => {
				handleErrorResponse(response);
			});
	}

	async function loadTimeLog(): Promise<void> {
		loadingTimelog = false;
		const token: string = $userStore.token || '';
		await fetch('api/timelog/', {
			headers: new Headers({ Authorization: `Bearer ${token}` })
		})
			.then(async (response: Response) => {
				if (!response.ok) {
					return Promise.reject(response);
				} else {
					allTimeLog = await response.json();
					filteredTimeLog = allTimeLog;
					loadingTimelog = true;
				}
			})
			.catch((response: Response) => {
				handleErrorResponse(response);
			});
	}
</script>

<div>
	<LayoutGrid style="padding: 0 0 30px 0">
		<Cell span={8}>
			<Card style="width: 100%; padding: 20px">
				<ClockYourTime bind:projectList={allProjects} />
			</Card>
		</Cell>
		<Cell>
			<Card style="width: 100%; padding: 20px; height: 100%">
				<Profile />
			</Card>
		</Cell>
	</LayoutGrid>
	<Card style="width: 100%; padding: 20px">
		<TimeLogList
			bind:projectList={allProjects}
			bind:loadingProject
			bind:timelogs={allTimeLog}
			bind:filteredTimeLogs={filteredTimeLog}
			bind:loadingTimelog
		/>
	</Card>
</div>

<style></style>
