import {
	c as create_ssr_component,
	a as subscribe,
	v as validate_component,
	l as each,
	e as escape
} from '../../../../chunks/index3.js';
import { u as userStore, C as CommonLabel } from '../../../../chunks/user.js';
import { S as Select, O as Option } from '../../../../chunks/Option.js';
import {
	C as Card,
	D as DataTable,
	H as Head,
	R as Row,
	a as Cell,
	B as Body
} from '../../../../chunks/NotchedOutline.js';
import '../../../../chunks/Toaster.svelte_svelte_type_style_lang.js';
import { I as Index } from '../../../../chunks/Index4.js';
import { mdiCheckCircleOutline } from '@mdi/js';
const _page_svelte_svelte_type_style_lang = '';
const css = {
	code: '.container.svelte-1b1rlws.mdc-card{padding:20px}.table-container.svelte-1b1rlws{max-height:75vh;overflow-y:auto}',
	map: null
};
function formatDate(date) {
	return date.split('T')[0];
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $$unsubscribe_userStore;
	$$unsubscribe_userStore = subscribe(userStore, (value) => value);
	let timelogs = [];
	let filteredTimeLogs = [];
	let projectList = [];
	let selectedProject = '';
	let sort = 'timestamp';
	let sortDirection = 'ascending';
	const getTimeLogsByProject = () => {
		if (selectedProject === ' ') {
			return (filteredTimeLogs = timelogs);
		}
		return (filteredTimeLogs = timelogs.filter(
			(timelog) => timelog.projectId.projectName === selectedProject
		));
	};
	$$result.css.add(css);
	let $$settled;
	let $$rendered;
	do {
		$$settled = true;
		{
			if (selectedProject) {
				getTimeLogsByProject();
			}
		}
		$$rendered = `<div class="container svelte-1b1rlws">${validate_component(Card, 'Card').$$render(
			$$result,
			{ style: 'padding: 20px' },
			{},
			{
				default: () => {
					return `<div><h2 class="mdc-typography--headline6" style="margin-top: 0;">Paid Time Logs History</h2></div>
		<div style="margin-bottom: 16px">${validate_component(Select, 'Select').$$render(
			$$result,
			{
				class: 'shaped-outlined',
				variant: 'outlined',
				label: 'Filter by Project',
				value: selectedProject
			},
			{
				value: ($$value) => {
					selectedProject = $$value;
					$$settled = false;
				}
			},
			{
				default: () => {
					return `${validate_component(Option, 'Option').$$render($$result, { value: ' ' }, {}, {})}
				${each(projectList, (project) => {
					return `${validate_component(Option, 'Option').$$render(
						$$result,
						{ value: project.projectName },
						{},
						{
							default: () => {
								return `${escape(project.projectName)}`;
							}
						}
					)}`;
				})}`;
				}
			}
		)}</div>
		<div class="table-container svelte-1b1rlws">${validate_component(DataTable, 'DataTable').$$render(
			$$result,
			{
				style: 'width: 100%',
				'table$aria-label': 'Time Log List',
				sortable: true,
				sort,
				sortDirection
			},
			{
				sort: ($$value) => {
					sort = $$value;
					$$settled = false;
				},
				sortDirection: ($$value) => {
					sortDirection = $$value;
					$$settled = false;
				}
			},
			{
				default: () => {
					return `${validate_component(Head, 'Head').$$render(
						$$result,
						{},
						{},
						{
							default: () => {
								return `<title>Time Log list</title>
					${validate_component(Row, 'Row').$$render(
						$$result,
						{},
						{},
						{
							default: () => {
								return `${validate_component(Cell, 'Cell').$$render(
									$$result,
									{ columnId: 'date' },
									{},
									{
										default: () => {
											return `${validate_component(CommonLabel, 'Label').$$render(
												$$result,
												{},
												{},
												{
													default: () => {
														return `Date`;
													}
												}
											)}`;
										}
									}
								)}
						${validate_component(Cell, 'Cell').$$render(
							$$result,
							{ sortable: false, columnId: 'description' },
							{},
							{
								default: () => {
									return `${validate_component(CommonLabel, 'Label').$$render(
										$$result,
										{},
										{},
										{
											default: () => {
												return `Employee Name`;
											}
										}
									)}`;
								}
							}
						)}
						${validate_component(Cell, 'Cell').$$render(
							$$result,
							{
								sortable: false,
								columnId: 'description',
								style: 'width: 70%;'
							},
							{},
							{
								default: () => {
									return `${validate_component(CommonLabel, 'Label').$$render(
										$$result,
										{},
										{},
										{
											default: () => {
												return `Description`;
											}
										}
									)}`;
								}
							}
						)}
						${validate_component(Cell, 'Cell').$$render(
							$$result,
							{
								columnId: 'project',
								style: 'width: 20%;'
							},
							{},
							{
								default: () => {
									return `${validate_component(CommonLabel, 'Label').$$render(
										$$result,
										{},
										{},
										{
											default: () => {
												return `Project`;
											}
										}
									)}`;
								}
							}
						)}
						${validate_component(Cell, 'Cell').$$render(
							$$result,
							{ columnId: 'hours', style: 'width: 10%;' },
							{},
							{
								default: () => {
									return `${validate_component(CommonLabel, 'Label').$$render(
										$$result,
										{},
										{},
										{
											default: () => {
												return `Hours`;
											}
										}
									)}`;
								}
							}
						)}
						${validate_component(Cell, 'Cell').$$render(
							$$result,
							{ columnId: 'approved' },
							{},
							{
								default: () => {
									return `${validate_component(CommonLabel, 'Label').$$render(
										$$result,
										{},
										{},
										{
											default: () => {
												return `Approved`;
											}
										}
									)}`;
								}
							}
						)}`;
							}
						}
					)}`;
							}
						}
					)}
				${validate_component(Body, 'Body').$$render(
					$$result,
					{},
					{},
					{
						default: () => {
							return `${each(filteredTimeLogs, (timelog) => {
								return `${validate_component(Row, 'Row').$$render(
									$$result,
									{},
									{},
									{
										default: () => {
											return `${validate_component(Cell, 'Cell').$$render(
												$$result,
												{},
												{},
												{
													default: () => {
														return `${escape(formatDate(timelog.timestamp))}`;
													}
												}
											)}
							${validate_component(Cell, 'Cell').$$render(
								$$result,
								{},
								{},
								{
									default: () => {
										return `${escape(timelog.userId.firstName)} ${escape(timelog.userId.lastName)}`;
									}
								}
							)}
							${validate_component(Cell, 'Cell').$$render(
								$$result,
								{},
								{},
								{
									default: () => {
										return `${escape(timelog.message)}`;
									}
								}
							)}
							${validate_component(Cell, 'Cell').$$render(
								$$result,
								{},
								{},
								{
									default: () => {
										return `${escape(timelog.projectId.projectName)}`;
									}
								}
							)}
							${validate_component(Cell, 'Cell').$$render(
								$$result,
								{ style: 'padding-left: 28px;' },
								{},
								{
									default: () => {
										return `${escape(timelog.hourSpent)}`;
									}
								}
							)}
							${validate_component(Cell, 'Cell').$$render(
								$$result,
								{},
								{},
								{
									default: () => {
										return `${
											timelog.approved
												? `${validate_component(Index, 'Icon').$$render(
														$$result,
														{
															path: mdiCheckCircleOutline,
															color: 'green',
															width: '25',
															height: '25',
															style: 'padding-left: 15px;'
														},
														{},
														{}
												  )}`
												: `${validate_component(Index, 'Icon').$$render(
														$$result,
														{
															path: mdiCheckCircleOutline,
															color: 'red',
															width: '25',
															height: '25',
															style: 'padding-left: 15px;'
														},
														{},
														{}
												  )}`
										}
							`;
									}
								}
							)}
						`;
										}
									}
								)}`;
							})}`;
						}
					}
				)}`;
				}
			}
		)}</div>`;
				}
			}
		)}
</div>`;
	} while (!$$settled);
	$$unsubscribe_userStore();
	return $$rendered;
});
export { Page as default };
