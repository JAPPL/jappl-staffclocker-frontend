<script lang="ts">
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import Textfield, { Input, Textarea } from '@smui/textfield';
	import Select, { Option } from '@smui/select';

	let value = '';
	let valueA: number | null = 1;
	let projectList: string[] | null[] = ['proj1', 'proj2', 'proj3'];
	let valueC: number | null = 1;

	function handleClick() {
		alert('clicked');
	}
</script>

<div class="container" style="height: 100%; margin: 0%;">
	<Cell span={12} style="max-height: 45%; height: auto;">
		<div style="height: 100%; display: flex; flex-flow: column;">
			<div>
				<h1>
					Clock Your Time
					<i class="material-icons logo-size">more_time</i>
				</h1>
			</div>
			<div id="rcorners1" style="overflow: auto">
				<Textfield
					style="width: 100%; height: 100%;"
					helperLine$style="width: 100%;"
					input$placeholder="Describe your work"
					textarea
					bind:value
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
						<div id="rcorners2">
							<Select
								style="width: 90%;"
								key={(value) => `${value == null ? '' : value}`}
								bind:value={valueA}
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
						<div id="rcorners2">
							<Select
								style="width: 90%;"
								key={(value) => `${value == null ? '' : value}`}
								bind:value
								label="Which Project"
							>
								<Option />
								{#each projectList as value}
									<Option {value}>{value}</Option>
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
						<div id="rcorners2">
							<Select
								style="width: 90%;"
								key={(value) => `${value == null ? '' : value}`}
								bind:value={valueC}
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
							<h1><br /></h1>
						</div>
						<button on:click={handleClick} class="button">
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
		margin: 0%;
		margin-bottom: 20px;
		border-radius: 15px;
		background: #51b198;
		height: 100%;
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
	#rcorners1 {
		margin-bottom: 30px;
		border-radius: 7px;
		border: 2px solid #130f42;
		opacity: 55%;
		flex-grow: 1;
	}
	#rcorners2 {
		margin: 0%;
		margin-bottom: 20px;
		border-radius: 15px;
		border: 2px solid rgba(19, 15, 66, 0.55);
		height: 100%;
		vertical-align: middle;
		flex-grow: 1;
	}
	/*
    .flex {
        align-items: center;
        display: block;
    }
    #rcorners2 {
        height: 20px;
		border-radius: 20px;
        padding: 20px;
        border: 2px solid #130F42;
	}
    .grid-container {
		display: grid;
		grid-template-columns: auto auto auto;
        column-gap: 20px;
	}
	.grid-container > div {
		text-align: center;
	}
    .item1 {
		grid-row-start: 1;
		grid-row-end: 2;
		grid-column-start: 1;
		grid-column-end: 3;
	}
	.row {
		grid-row-start: 2;
		grid-row-end: 3;
        grid-column-start: 1;
		grid-column-end: 3;
	} */
</style>
