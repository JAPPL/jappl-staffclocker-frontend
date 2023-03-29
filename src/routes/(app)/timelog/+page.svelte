<script lang="ts">
	import { userStore } from '../../../lib/store/user.js';
	import Select, { Option } from '@smui/select';
	import Icon from '@smui/select/icon';
	import type { ErrorResponse } from '../../../lib/interface/error-response';
	import DataTable, { Head, Body, Row, Cell, Label, SortValue } from '@smui/data-table';
	import IconButton from '@smui/icon-button';
	import { onMount } from 'svelte';
	import toast from 'svelte-french-toast';

	async function handleErrorResponse(response: Response): Promise<void> {
		if (response.status == 500) {
			toast.error('Internal server error.');
		} else {
			let err: ErrorResponse = await response.json();
			toast.error(err.detail);
		}
	}

	async function loadTimeLog(): Promise<void> {
		console.log('hello');
		loading = false;
		const token: string = $userStore.token || '';
		await fetch('api/timelog/all', {
			headers: new Headers({ Authorization: `Bearer ${token}` })
		})
			.then(async (response: Response) => {
				if (!response.ok) {
					return Promise.reject(response);
				} else {
					items = await response.json();
					loading = true;
				}
			})
			.catch((response: Response) => {
				handleErrorResponse(response);
			});
	}

	onMount(async () => {
		console.log('mounted');
		await loadTimeLog();
	});

	type TimeLog = {
		date: string;
		description: string;
		project: string;
		hours: number;
		approved: boolean;
	};

	let items: TimeLog[] = [];
	let filter_by_date = ['Last Month', 'Last Year'];
	// let filter_by_project = [];
	let sort: keyof TimeLog = 'date';
	let sortDirection: Lowercase<keyof typeof SortValue> = 'ascending';
	let loading = false;

	function handleSort() {
		items.sort((a, b) => {
			const [aVal, bVal] = [a[sort], b[sort]][
				sortDirection === 'ascending' ? 'slice' : 'reverse'
			]();
			if (typeof aVal === 'string' && typeof bVal === 'string') {
				return aVal.localeCompare(bVal);
			}
			return Number(aVal) - Number(bVal);
		});
	}
</script>

<div id="rcorners1">
	<DataTable
		style="margin: 25px; 
				width: 95%; 
				max-height: 80%;"
		table$aria-label="Time Log List"
		sortable
		bind:sort
		bind:sortDirection
		on:SMUIDataTable:sorted={handleSort}
	>
		<Head>
			<div style="margin-left: 20px;">
				<h2 class="mdc-typography--headline6" style="margin-top: 15px;">Time Logs History</h2>
			</div>
			<div style="padding-left: 20px;">
				<Select class="shaped-outlined" variant="outlined" label="Filter by date">
					<Icon class="material-icons" slot="leadingIcon">event</Icon>
					<Option value="" />
					{#each filter_by_date as d}
						<Option value={d}>{d}</Option>
					{/each}
				</Select>

				<Select class="shaped-outlined" variant="outlined" label="Filter by Project">
					<Icon class="material-icons" slot="leadingIcon">listalt</Icon>
					<!-- <Option value="" />
					{#each filter_by_project as d}
						<Option value={d}>{d}</Option>
					{/each} -->
				</Select>
			</div>
			<Row>
				<!--
						Note: whatever you supply to "columnId" is
						appended with "-status-label" and used as an ID
						for the hidden label that describes the sort
						status to screen readers.
				 
						You can localize those labels with the
						"sortAscendingAriaLabel" and
						"sortDescendingAriaLabel" props on the DataTable.
					  -->
				<Cell columnId="date">
					<!-- For numeric columns, icon comes first. -->
					<IconButton class="material-icons">arrow_upward</IconButton>
					<Label>Date</Label>
				</Cell>
				<Cell columnId="description" style="width: 100%;">
					<Label>Description</Label>
					<!-- For non-numeric columns, icon comes second. -->
					<IconButton class="material-icons">arrow_upward</IconButton>
				</Cell>
				<Cell columnId="project">
					<Label>Project</Label>
					<IconButton class="material-icons">arrow_upward</IconButton>
				</Cell>
				<Cell columnId="hours">
					<Label>Hours</Label>
					<IconButton class="material-icons">arrow_upward</IconButton>
				</Cell>
				<Cell columnId="approved">
					<Label>Approved</Label>
					<IconButton class="material-icons">arrow_upward</IconButton>
				</Cell>
				<Cell>
					<Label>Actions</Label>
				</Cell>
				<!-- You can turn off sorting for a column.
					  <Cell sortable={false}>Website</Cell> -->
			</Row>
		</Head>
		<Body>
			{#each items as item (item.date)}
				<Row>
					<Cell>{item.date}</Cell>
					<Cell>{item.description}</Cell>
					<Cell>{item.project}</Cell>
					<Cell>{item.hours}</Cell>
					<Cell>{item.approved}</Cell>
					<IconButton class="material-icons">edit</IconButton>
					<IconButton class="material-icons">delete</IconButton>
				</Row>
			{/each}
		</Body>
	</DataTable>
</div>

<style>
	#rcorners1 {
		border-radius: 20px;
		background: white;
		margin: 25px;
		width: auto;
		height: 100%;
	}
</style>
