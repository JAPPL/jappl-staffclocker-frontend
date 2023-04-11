<script lang="ts">
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import Textfield from '@smui/textfield';
	import Select, { Option } from '@smui/select';
	import { userStore } from '$lib/store/user';
	import toast from 'svelte-french-toast';
	import Button, { Label } from '@smui/button';
	import { required, min } from 'svelte-forms/validators';
	import Flatpickr from 'svelte-flatpickr';
	import 'flatpickr/dist/flatpickr.css';
	import 'flatpickr/dist/themes/light.css';
	import type { ErrorResponse } from '../../../interface/error-response';
	import type { Project } from '../../../interface/project';
	import { field, form } from 'svelte-forms';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	export let projectList: Project[] = [];
	export let loadProject = false;

	let message = field('message', '', [required()]);
	let hourSpent = field('hourSpent', 1, [min(1)]);
	let project = field('project', 0, [min(1)]);
	let selectedDate = field('date', null, [required()]);
	let timeLogForm = form(message, hourSpent, project, selectedDate);
	let loading = false;

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

	async function handleErrorResponse(response: Response): Promise<void> {
		if (response.status == 500) {
			toast.error('Internal server error.');
		} else {
			let err: ErrorResponse = await response.json();
			toast.error(err.detail);
		}
	}

	async function saveTimeLog(): Promise<void> {
		await timeLogForm.validate();
		if ($timeLogForm.valid) {
			loading = true;
			const token: string = $userStore.token || '';
			await fetch('api/timelog/create', {
				method: 'POST',
				body: JSON.stringify({
					hour_spent: $hourSpent.value,
					message: $message.value,
					project_id: $project.value,
					timestamp: new Date(new Date().setDate($selectedDate.value.getDate()))
				}),
				headers: new Headers({
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json'
				})
			})
				.then(async (response: Response) => {
					if (!response.ok) {
						return Promise.reject(response);
					} else {
						toast.success('Add new time log successfully.');
						dispatch('loadTimeLog', true);
						$message.value = '';
						$hourSpent.value = 1;
						$project.value = 0;
						$selectedDate.value = null;
					}
				})
				.catch((response: Response) => {
					handleErrorResponse(response);
				})
				.finally(() => (loading = false));
		} else {
			toast.error('Some fields are incomplete. Please revise them.');
		}
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
			disabled={loading}
			invalid={$timeLogForm.hasError('message.required')}
			textarea
			bind:value={$message.value}
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
						disabled={loading}
						key={(value) => `${value == null ? '' : value}`}
						bind:value={$hourSpent.value}
						invalid={$timeLogForm.hasError('hourSpent.min')}
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
						disabled={loading || loadProject}
						invalid={$timeLogForm.hasError('project.min')}
						key={(project) => `${project ? project : 0}`}
						bind:value={$project.value}
					>
						<Option value={0}>Not selected</Option>
						{#each projectList as project (project.projectName)}
							<Option value={project.projectId}>{project.projectName}</Option>
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
				<Flatpickr options={flatpickrOptions} bind:value={$selectedDate.value} element="#my-picker">
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
				disabled={loading || loadProject}
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
