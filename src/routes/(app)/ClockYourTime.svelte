<script lang="ts">
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import Textfield from '@smui/textfield';
	import Select, { Option } from '@smui/select';
	import { DateInput } from 'date-picker-svelte';
	import type { Project } from '$lib/interface/project';
	import type { ErrorResponse } from '$lib/interface/error-response';
	import { userStore } from '$lib/store/user';
	import { onMount } from 'svelte';
	import toast from 'svelte-french-toast';

	import Flatpickr from 'svelte-flatpickr';

	import 'flatpickr/dist/flatpickr.css';
	import 'flatpickr/dist/themes/light.css';
	import Body from '@smui/data-table/src/Body.svelte';

	let date: Date | null = null;
	const flatpickrOptions = {
		wrap: true,
		element: '#my-picker',
		disable: [
			function (date: Date) {
				// return true to disable
				let dateNow = new Date();
				return date < new Date(new Date().setDate(dateNow.getDate() - 7));
			}
		]
	};

	let describeWork = '';
	let project: Project | null = null;
	let hourSpent: number | null = 1;
	let valueC: number | null = 1;
	let loading = false;
	let projectList: Project[] = [];

	onMount(async () => {
		await loadProject();
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
		loading = false;
		const token: string = $userStore.token || '';
		await fetch('api/project/', {
			method: 'GET',
			headers: new Headers({ Authorization: `Bearer ${token}` })
		})
			.then(async (response: Response) => {
				if (!response.ok) {
					return Promise.reject(response);
				} else {
					projectList = await response.json();
					loading = true;
				}
			})
			.catch((response: Response) => {
				handleErrorResponse(response);
			});
	}

	async function saveTimeLog(): Promise<void> {
		loading = false;
		const token: string = $userStore.token || '';
		console.log(
			JSON.stringify({
				hour_spent: hourSpent,
				message: describeWork,
				project_id: project?.projectId,
				timestamp: new Date(new Date().setDate(date!.getDate()))
			})
		);
		await fetch('api/timelog/create', {
			method: 'POST',
			body: JSON.stringify({
				hour_spent: hourSpent,
				message: describeWork,
				project_id: project?.projectId,
				timestamp: new Date(new Date().setDate(date!.getDate()))
			}),
			headers: new Headers({ Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' })
		})
			.then(async (response: Response) => {
				if (!response.ok) {
					return Promise.reject(response);
				} else {
					console.log('cowabunga');
				}
			})
			.catch((response: Response) => {
				handleErrorResponse(response);
			});
	}
</script>

<div class="container" style="height: 100%; margin: 0%; display: flex; flex-direction: column;">
	<Cell span={12} style="flex-grow: 1;">
		<div style="height: 100%; display: flex; flex-direction: column;">
			<div>
				<h1>
					Clock Your Time
					<i class="material-icons logo-size">more_time</i>
				</h1>
			</div>
			<div class="rcorners1">
				<Textfield
					style="width: 100%; height: 100%;"
					helperLine$style="width: 100%;"
					input$placeholder="Describe your work"
					textarea
					bind:value={describeWork}
				/>
			</div>
		</div>
	</Cell>
	<Cell span={12} style="max-height: 30%;">
		<div style="height: 100%;">
			<LayoutGrid>
				<Cell span={6} style="height: 100%;">
					<div style="height: 100%; display: flex; flex-flow: column;">
						<div>
							<h1>Hour Spent</h1>
						</div>
						<div class="rcorners2">
							<Select
								style="width: 95%;"
								key={(value) => `${value == null ? '' : value}`}
								bind:value={hourSpent}
								placeholder="Hours Spent"
							>
								{#each [1, 2, 3, 4, 5, 6, 7, 8] as value}
									<Option {value}>{value}</Option>
								{/each}
							</Select>
						</div>
					</div>
				</Cell>
				<Cell span={6} style="height: 100%;">
					<div style="height: 100%; display: flex; flex-flow: column;">
						<div>
							<h1>Project</h1>
						</div>
						<div class="rcorners2">
							<Select
								style="width: 95%;"
								key={(value) => `${value == '' ? 'Select' : value}`}
								bind:value={project}
							>
								<Option />
								{#each projectList as value}
									<Option {value}>{value.projectName}</Option>
								{/each}
							</Select>
						</div>
					</div>
				</Cell>
			</LayoutGrid>
		</div>
	</Cell>
	<Cell span={12} style="max-height: 30%">
		<div style="height: 100%;">
			<LayoutGrid>
				<Cell span={6} style="height: 100%;">
					<div style="height: 100%; display: flex; flex-flow: column;">
						<div>
							<h1>Date</h1>
						</div>
						<Flatpickr options={flatpickrOptions} bind:value={date} element="#my-picker">
							<div class="rcorners3" id="my-picker" style="position:relative;">
								<input type="text" placeholder="Select Date.." data-input />
							</div>
						</Flatpickr>
					</div>
				</Cell>
				<Cell span={6} style="height: 100%;">
					<div style="max-height: 100%; display: flex; flex-flow: column;">
						<div>
							<h1><br /></h1>
						</div>
						<button on:click={saveTimeLog} class="button">
							<h1>Save</h1>
						</button>
					</div>
				</Cell>
			</LayoutGrid>
		</div>
	</Cell>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;800&display=swap');

	:root {
		--date-input-width: 90%;
	}
	:global(input) {
		border: none !important;
		top: 0px;
		height: 100% !important;
		vertical-align: middle;
		flex-grow: 1;
	}
	:global(input:focus) {
		box-shadow: none !important;
	}
	.container :global(.mdc-layout-grid) {
		padding: 0px;
		height: 100%;
	}
	.container :global(.mdc-layout-grid__inner) {
		padding: 0%;
		margin: 0%;
		height: 100%;
	}
	.container :global(.mdc-notched-outline__leading) {
		border: 0px;
	}
	.container :global(.mdc-notched-outline__trailing) {
		border: 0px;
	}
	.container :global(.mdc-notched-outline__notch) {
		border: 0px;
	}
	.container :global(.mdc-line-ripple::before) {
		border-bottom-style: none;
	}
	.container :global(.mdc-line-ripple::after) {
		border-bottom-style: none;
	}
	.container :global(.smui-select--standard .mdc-select__anchor) {
		height: 40px;
	}
	.container :global(.mdc-text-field__resizer) {
		resize: none;
	}
	.button {
		border: none;
		padding: 0px;
		margin: 0px;
		border-radius: 15px;
		background: #51b198;
		height: 44px;
		vertical-align: middle;
		flex-grow: 1;
	}
	div > h1 {
		margin: 0;
		margin-bottom: 10px;
		font-family: 'Inter', sans-serif;
		font-size: 16px;
		text-align: left;
		color: #130f42;
	}
	button > h1 {
		margin: 0;
		font-family: 'Inter', sans-serif;
		font-size: 20px;
		color: #130f42;
	}
	.logo-size {
		font-size: 20px;
		color: #130f42;
	}
	.rcorners1 {
		margin-bottom: 30px;
		border-radius: 7px;
		border: 2px solid #130f42;
		opacity: 55%;
		flex-grow: 1;
	}
	.rcorners2 {
		margin: 0%;
		margin-bottom: 20px;
		border-radius: 15px;
		border: 2px solid rgba(19, 15, 66, 0.55);
		height: 100%;
		vertical-align: middle;
		flex-grow: 1;
	}
	.rcorners3 {
		margin: 0%;
		border-radius: 15px;
		border: 2px solid rgba(19, 15, 66, 0.55);
		height: 100%;
		vertical-align: middle;
		flex-grow: 1;
	}
</style>
