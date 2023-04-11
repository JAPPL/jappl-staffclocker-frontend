<script lang="ts">
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import Textfield from '@smui/textfield';
	import Select, { Option } from '@smui/select';
	import { userStore } from '$lib/store/user';
	import toast from 'svelte-french-toast';
	import Button, { Label } from '@smui/button';

	import Flatpickr from 'svelte-flatpickr';

	import 'flatpickr/dist/flatpickr.css';
	import 'flatpickr/dist/themes/light.css';
	import type { ErrorResponse } from '../../../interface/error-response';
	import type { Project } from '../../../interface/project';

	let date: Date | null = null;
	const flatpickrOptions = {
		wrap: true,
		element: '#my-picker',
		disable: [
			function (date: Date) {
				let dateNow = new Date();
				return date < new Date(new Date().setDate(dateNow.getDate() - 7));
			}
		]
	};

	export let projectList: Project[] = [];

	let describeWork = '';
	let project: Project | null = null;
	let hourSpent: number | null = 1;
	let loading = false;

	async function handleErrorResponse(response: Response): Promise<void> {
		if (response.status == 500) {
			toast.error('Internal server error.');
		} else {
			let err: ErrorResponse = await response.json();
			toast.error(err.detail);
		}
	}

	async function saveTimeLog(): Promise<void> {
		loading = false;
		const token: string = $userStore.token || '';
		// TODO: Add form validator here to handle negative case
		// console.log(
		// 	JSON.stringify({
		// 		hour_spent: hourSpent,
		// 		message: describeWork,
		// 		project_id: project?.projectId,
		// 		timestamp: new Date(new Date().setDate(date!.getDate()))
		// 	})
		// );
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
					toast.success('Add new time log successfully.');
				}
			})
			.catch((response: Response) => {
				handleErrorResponse(response);
			});
	}
</script>

<div class="container">
	<div style="display: flex; flex-direction: column;">
		<div>
			<h1>
				Clock Your Time
				<i class="material-icons logo-size">more_time</i>
			</h1>
		</div>
		<Textfield
			style="width: 100%; height: 100%;"
			helperLine$style="width: 100%;"
			input$placeholder="Describe your work"
			textarea
			bind:value={describeWork}
		/>
	</div>
	<LayoutGrid>
		<Cell span={6} style="height: 100%;">
			<div style="height: 100%; display: flex; flex-flow: column;">
				<div>
					<h1>Hour Spent</h1>
				</div>
				<div class="rcorners2">
					<Select
						style="width: 100%;"
						variant="outlined"
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
						style="width: 100%;"
						variant="outlined"
						key={(value) => `${value === '' ? 'Select' : value}`}
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
	<LayoutGrid>
		<Cell span={6}>
			<div style="height: 100%; display: flex; flex-flow: column;">
				<div>
					<h1>Date</h1>
				</div>
				<Flatpickr options={flatpickrOptions} bind:value={date} element="#my-picker">
					<div id="my-picker">
						<input type="text" placeholder="Select Date.." data-input />
					</div>
				</Flatpickr>
			</div>
		</Cell>
		<Cell span={6} style="display: flex; justify-content: flex-end; align-items: flex-end">
			<Button
				color="secondary"
				on:click={() => saveTimeLog()}
				variant="unelevated"
				class="button-shaped-round"
			>
				<Label>Save</Label>
			</Button>
		</Cell>
	</LayoutGrid>
</div>

<style>
	:root {
		--date-input-width: 90%;
	}

	:global(input) {
		height: 100% !important;
		width: 46vh;
		border: 1px solid rgba(19, 15, 66, 0.55) !important;
		background: transparent;
		vertical-align: middle;
		border-radius: 5px;
		padding: 5px;
	}
	:global(input:focus) {
		box-shadow: none !important;
	}

	.container :global(.mdc-text-field__resizer) {
		resize: none;
	}

	.container :global(.mdc-layout-grid) {
		padding: 0;
		margin-top: 10px;
	}

	div > h1 {
		margin: 0 0 10px 0;
		font-size: 16px;
		color: #130f42;
	}

	.logo-size {
		font-size: 20px;
		color: #130f42;
	}
</style>
