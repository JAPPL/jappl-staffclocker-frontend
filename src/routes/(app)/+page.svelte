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
	import type { ProjectMember } from '../../lib/interface/project-member';

	let allProjects: Project[] = [];
	let filteredProjects: Project[] = [];
	let allTimeLog: TimeLog[] = [];
	let filteredTimeLog: TimeLog[] = [];
	let loadingProject = false;
	let loadingFilteredProject = false;
	let loadingTimelog = true;
	let totalHour = 0;

	onMount(async () => {
		await loadProject();
		await loadTimeLog();
		await loadProjectMember();
	});

	async function handleErrorResponse(response: Response): Promise<void> {
		if (response.status == 500) {
			toast.error('Internal server error.');
		} else {
			let err: ErrorResponse = await response.json();
			toast.error(err.detail);
		}
	}

	async function loadProjectMember(): Promise<void> {
		loadingFilteredProject = true;
		const token: string = $userStore.token || '';
		await fetch('api/project-member/list', {
			method: 'GET',
			headers: new Headers({ Authorization: `Bearer ${token}` })
		})
			.then(async (response: Response) => {
				if (!response.ok) {
					return Promise.reject(response);
				} else {
					const allProjectMembers: ProjectMember[] = await response.json();
					filteredProjects = allProjectMembers
						.filter((member: ProjectMember) => member.user.email === $userStore.email)
						.map((member: ProjectMember) => member.project);
					loadingFilteredProject = false;
				}
			})
			.catch((response: Response) => {
				handleErrorResponse(response);
			});
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
					getTotalHour();
					loadingTimelog = true;
				}
			})
			.catch((response: Response) => {
				handleErrorResponse(response);
			});
	}

	function getTotalHour(): void {
		totalHour = 0;
		for (let i of allTimeLog) {
			totalHour += i.hourSpent;
		}
	}
</script>

<div>
	<LayoutGrid style="padding: 0 0 30px 0">
		<Cell span={9}>
			<Card style="width: 100%; padding: 20px; height: 100%">
				<ClockYourTime
					bind:projectList={filteredProjects}
					on:loadTimeLog={loadTimeLog}
					bind:loadProject={loadingFilteredProject}
				/>
			</Card>
		</Cell>
		<Cell span={3}>
			<Card style="width: 100%; padding: 20px; height: 100%">
				<Profile bind:totalHour />
			</Card>
		</Cell>
	</LayoutGrid>
	<Card style="width: 100%; padding: 20px">
		<TimeLogList
			bind:projectList={allProjects}
			bind:filteredProject={filteredProjects}
			bind:timelogs={allTimeLog}
			bind:filteredTimeLogs={filteredTimeLog}
			bind:loadingTimelog
			on:loadTimeLog={loadTimeLog}
		/>
	</Card>
</div>

<style></style>
