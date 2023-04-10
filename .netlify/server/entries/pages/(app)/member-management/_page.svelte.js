import {
	c as create_ssr_component,
	a as subscribe,
	q as createEventDispatcher,
	v as validate_component,
	e as escape,
	l as each
} from '../../../../chunks/index3.js';
import {
	C as Card,
	D as DataTable,
	H as Head,
	R as Row,
	a as Cell,
	B as Body
} from '../../../../chunks/NotchedOutline.js';
import { I as Index } from '../../../../chunks/Index4.js';
import { L as LinearProgress } from '../../../../chunks/LinearProgress.js';
import { u as userStore, C as CommonLabel } from '../../../../chunks/user.js';
import { mdiAccountPlus, mdiDeleteEmpty } from '@mdi/js';
import { B as Button } from '../../../../chunks/Button.js';
import { S as Select, O as Option } from '../../../../chunks/Option.js';
import '../../../../chunks/Toaster.svelte_svelte_type_style_lang.js';
import 'query-string';
import { D as Dialog, T as Title, C as Content, A as Actions } from '../../../../chunks/Actions.js';
import { field, form } from 'svelte-forms';
import { required } from 'svelte-forms/validators';
const ProjectMemberDeleteConfirmation = create_ssr_component(
	($$result, $$props, $$bindings, slots) => {
		let $$unsubscribe_userStore;
		$$unsubscribe_userStore = subscribe(userStore, (value) => value);
		createEventDispatcher();
		let { openDeleteDialog = false } = $$props;
		let { selectedProjectMemberForDelete } = $$props;
		if (
			$$props.openDeleteDialog === void 0 &&
			$$bindings.openDeleteDialog &&
			openDeleteDialog !== void 0
		)
			$$bindings.openDeleteDialog(openDeleteDialog);
		if (
			$$props.selectedProjectMemberForDelete === void 0 &&
			$$bindings.selectedProjectMemberForDelete &&
			selectedProjectMemberForDelete !== void 0
		)
			$$bindings.selectedProjectMemberForDelete(selectedProjectMemberForDelete);
		let $$settled;
		let $$rendered;
		do {
			$$settled = true;
			$$rendered = `<div>${validate_component(Dialog, 'Dialog').$$render(
				$$result,
				{
					scrimClickAction: '',
					escapeKeyAction: '',
					'aria-labelledby': 'mandatory-title',
					'aria-describedby': 'mandatory-content',
					open: openDeleteDialog
				},
				{
					open: ($$value) => {
						openDeleteDialog = $$value;
						$$settled = false;
					}
				},
				{
					default: () => {
						return `${validate_component(Title, 'Title').$$render(
							$$result,
							{
								id: 'mandatory-title',
								'data-testid': 'mandatory-title-delete'
							},
							{},
							{
								default: () => {
									return `Project Member Delete Confirmation`;
								}
							}
						)}
		${validate_component(Content, 'Content').$$render(
			$$result,
			{
				id: 'mandatory-content',
				'data-testid': 'mandatory-content-delete'
			},
			{},
			{
				default: () => {
					return `Are you sure to delete user
			${escape(selectedProjectMemberForDelete?.user.firstName || 'N/A')}
			${escape(selectedProjectMemberForDelete?.user.lastName || 'N/A')}
			in project ${escape(selectedProjectMemberForDelete?.project.projectName || 'N/A')}?
		`;
				}
			}
		)}
		${validate_component(Actions, 'Actions').$$render(
			$$result,
			{},
			{},
			{
				default: () => {
					return `${validate_component(Button, 'Button').$$render(
						$$result,
						{
							action: 'close',
							'data-testid': 'delete-close-button'
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
											return `Close`;
										}
									}
								)}`;
							}
						}
					)}
			${validate_component(Button, 'Button').$$render(
				$$result,
				{
					color: 'secondary',
					variant: 'unelevated',
					'data-testid': 'delete-confirm-button'
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
									return `Confirm`;
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
</div>`;
		} while (!$$settled);
		$$unsubscribe_userStore();
		return $$rendered;
	}
);
const ProjectMemberCreateDialog_svelte_svelte_type_style_lang = '';
const css$1 = {
	code: '.invalid-field.svelte-1oipm1e{margin:10px;color:#b71c1cff}.dialog-divider.svelte-1oipm1e{margin:2px 0;border-bottom:1px solid #bfbfbf}',
	map: null
};
const ProjectMemberCreateDialog = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $projectForm, $$unsubscribe_projectForm;
	let $userId, $$unsubscribe_userId;
	let $projectId, $$unsubscribe_projectId;
	let $$unsubscribe_userStore;
	$$unsubscribe_userStore = subscribe(userStore, (value) => value);
	createEventDispatcher();
	let { loadingDialog = true } = $$props;
	let { openCreateDialog = false } = $$props;
	let { allProjects = [] } = $$props;
	let { allUsers = [] } = $$props;
	let { allProjectMembers = [] } = $$props;
	let projectId = field('project', null, [required()]);
	$$unsubscribe_projectId = subscribe(projectId, (value) => ($projectId = value));
	let userId = field('user', null, [required()]);
	$$unsubscribe_userId = subscribe(userId, (value) => ($userId = value));
	let projectForm = form(projectId, userId);
	$$unsubscribe_projectForm = subscribe(projectForm, (value) => ($projectForm = value));
	let loadUser = true;
	let filterUserOptions = [];
	if ($$props.loadingDialog === void 0 && $$bindings.loadingDialog && loadingDialog !== void 0)
		$$bindings.loadingDialog(loadingDialog);
	if (
		$$props.openCreateDialog === void 0 &&
		$$bindings.openCreateDialog &&
		openCreateDialog !== void 0
	)
		$$bindings.openCreateDialog(openCreateDialog);
	if ($$props.allProjects === void 0 && $$bindings.allProjects && allProjects !== void 0)
		$$bindings.allProjects(allProjects);
	if ($$props.allUsers === void 0 && $$bindings.allUsers && allUsers !== void 0)
		$$bindings.allUsers(allUsers);
	if (
		$$props.allProjectMembers === void 0 &&
		$$bindings.allProjectMembers &&
		allProjectMembers !== void 0
	)
		$$bindings.allProjectMembers(allProjectMembers);
	$$result.css.add(css$1);
	let $$settled;
	let $$rendered;
	do {
		$$settled = true;
		$$rendered = `<div>${validate_component(Dialog, 'Dialog').$$render(
			$$result,
			{
				'aria-labelledby': 'mandatory-create-title',
				'aria-describedby': 'mandatory-content',
				scrimClickAction: '',
				escapeKeyAction: '',
				surface$style:
					'min-width: calc(100vw - 60vw); max-width: calc(100vw - 100px); min-height: calc(50vh) ',
				open: openCreateDialog
			},
			{
				open: ($$value) => {
					openCreateDialog = $$value;
					$$settled = false;
				}
			},
			{
				default: () => {
					return `${validate_component(Title, 'Title').$$render(
						$$result,
						{
							id: 'mandatory-create-title',
							'data-testid': 'mandatory-create-title'
						},
						{},
						{
							default: () => {
								return `Add project member`;
							}
						}
					)}
		${loadingDialog ? `<div class="dialog-divider svelte-1oipm1e"></div>` : ``}
		${validate_component(LinearProgress, 'LinearProgress').$$render(
			$$result,
			{
				'data-testid': 'load-bar',
				indeterminate: true,
				closed: loadingDialog
			},
			{
				closed: ($$value) => {
					loadingDialog = $$value;
					$$settled = false;
				}
			},
			{}
		)}
		${validate_component(Content, 'Content').$$render(
			$$result,
			{
				id: 'mandatory-content',
				'data-testid': 'mandatory-content'
			},
			{},
			{
				default: () => {
					return `${validate_component(Select, 'Select').$$render(
						$$result,
						{
							disabled: !loadingDialog,
							variant: 'outlined',
							'data-testid': 'project-selector',
							key: (project) => `${project ? project.projectId : ''}`,
							label: 'Selected project',
							invalid: $projectForm.hasError('project.required'),
							class: 'shaped-outlined',
							value: $projectId.value
						},
						{
							value: ($$value) => {
								$projectId.value = $$value;
								$$settled = false;
							}
						},
						{
							default: () => {
								return `${validate_component(Option, 'Option').$$render(
									$$result,
									{ value: void 0 },
									{},
									{}
								)}
				${each(allProjects, (project) => {
					return `${validate_component(Option, 'Option').$$render(
						$$result,
						{
							'data-testid': project.projectName,
							value: project.projectId
						},
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
					)}
			${validate_component(Select, 'Select').$$render(
				$$result,
				{
					disabled: !loadingDialog || loadUser,
					variant: 'outlined',
					'data-testid': 'user-selector',
					key: (user) => `${user ? user.userId : ''}`,
					invalid: $projectForm.hasError('user.required'),
					label: 'Select User',
					class: 'shaped-outlined',
					value: $userId.value
				},
				{
					value: ($$value) => {
						$userId.value = $$value;
						$$settled = false;
					}
				},
				{
					default: () => {
						return `${validate_component(Option, 'Option').$$render(
							$$result,
							{ value: void 0 },
							{},
							{}
						)}
				${each(filterUserOptions, (user) => {
					return `${validate_component(Option, 'Option').$$render(
						$$result,
						{ value: user.userId },
						{},
						{
							default: () => {
								return `${escape(user.firstName)} ${escape(user.lastName)}`;
							}
						}
					)}`;
				})}`;
					}
				}
			)}
			${
				$projectForm.hasError('project.required') || $projectForm.hasError('user.required')
					? `<p data-testid="error-message" class="invalid-field svelte-1oipm1e">Please select both fields</p>`
					: ``
			}`;
				}
			}
		)}

		${validate_component(Actions, 'Actions').$$render(
			$$result,
			{},
			{},
			{
				default: () => {
					return `${validate_component(Button, 'Button').$$render(
						$$result,
						{
							action: 'close',
							'data-testid': 'close-button'
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
											return `Close`;
										}
									}
								)}`;
							}
						}
					)}
			${validate_component(Button, 'Button').$$render(
				$$result,
				{
					'data-testid': 'confirm-button',
					color: 'secondary',
					variant: 'unelevated',
					action: 'submit'
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
									return `Confirm`;
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
</div>`;
	} while (!$$settled);
	$$unsubscribe_projectForm();
	$$unsubscribe_userId();
	$$unsubscribe_projectId();
	$$unsubscribe_userStore();
	return $$rendered;
});
const _page_svelte_svelte_type_style_lang = '';
const css = {
	code: '.container.svelte-bdbl5f.mdc-card{padding:20px}.table-container.svelte-bdbl5f{max-height:75vh;overflow-y:auto}.filter-container.svelte-bdbl5f{margin-bottom:16px}.divider.svelte-bdbl5f{margin:16px 0;border-bottom:1px solid #bfbfbf}',
	map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $$unsubscribe_userStore;
	$$unsubscribe_userStore = subscribe(userStore, (value) => value);
	let loading = false;
	let openDeleteDialog = false;
	let openCreateDialog = false;
	let selectedProjectMemberForDelete;
	let projectList = [];
	let projectMemberList = [];
	let userList = [];
	let filter = { project: void 0, user: void 0 };
	$$result.css.add(css);
	let $$settled;
	let $$rendered;
	do {
		$$settled = true;
		$$rendered = `<div class="container svelte-bdbl5f">${validate_component(Card, 'Card').$$render(
			$$result,
			{ style: 'padding: 20px;' },
			{},
			{
				default: () => {
					return `<div style="display: flex; justify-content: space-between"><h2 class="mdc-typography--headline6" style="margin: 0;">Project Member Management</h2>
			${validate_component(Button, 'Button').$$render(
				$$result,
				{
					disabled: !loading,
					color: 'secondary',
					variant: 'unelevated'
				},
				{},
				{
					default: () => {
						return `${validate_component(Index, 'Icon').$$render(
							$$result,
							{ path: mdiAccountPlus },
							{},
							{}
						)}
				${validate_component(CommonLabel, 'Label').$$render(
					$$result,
					{ style: 'margin-left: 5px' },
					{},
					{
						default: () => {
							return `Add project member`;
						}
					}
				)}`;
					}
				}
			)}</div>
		<div class="divider svelte-bdbl5f"></div>
		<div class="filter-container svelte-bdbl5f">${validate_component(Select, 'Select').$$render(
			$$result,
			{
				disabled: !loading,
				variant: 'outlined',
				key: (project) => `${project ? project.projectId : null}`,
				label: 'Filter by project',
				class: 'shaped-outlined',
				value: filter.project
			},
			{
				value: ($$value) => {
					filter.project = $$value;
					$$settled = false;
				}
			},
			{
				default: () => {
					return `${validate_component(Option, 'Option').$$render(
						$$result,
						{ value: null },
						{},
						{
							default: () => {
								return `Not selected`;
							}
						}
					)}
				${each(projectList, (project) => {
					return `${validate_component(Option, 'Option').$$render(
						$$result,
						{ value: project },
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
		)}
			${validate_component(Select, 'Select').$$render(
				$$result,
				{
					disabled: !loading,
					key: (user) => `${user ? user.userId : null}`,
					variant: 'outlined',
					label: 'Filter by user',
					class: 'shaped-outlined',
					value: filter.user
				},
				{
					value: ($$value) => {
						filter.user = $$value;
						$$settled = false;
					}
				},
				{
					default: () => {
						return `${validate_component(Option, 'Option').$$render(
							$$result,
							{ value: null },
							{},
							{
								default: () => {
									return `Not selected`;
								}
							}
						)}
				${each(userList, (userOption) => {
					return `${validate_component(Option, 'Option').$$render(
						$$result,
						{ value: userOption },
						{},
						{
							default: () => {
								return `${escape(userOption.firstName)} ${escape(userOption.lastName)}`;
							}
						}
					)}`;
				})}`;
					}
				}
			)}</div>
		<div class="table-container svelte-bdbl5f">${validate_component(DataTable, 'DataTable').$$render(
			$$result,
			{
				'table$aria-label': 'Project Member List',
				style: 'width: 100%;'
			},
			{},
			{
				progress: () => {
					return `${validate_component(LinearProgress, 'LinearProgress').$$render(
						$$result,
						{
							indeterminate: true,
							'aria-label': 'Data is being loaded...',
							slot: 'progress',
							closed: loading
						},
						{
							closed: ($$value) => {
								loading = $$value;
								$$settled = false;
							}
						},
						{}
					)}`;
				},
				default: () => {
					return `${validate_component(Head, 'Head').$$render(
						$$result,
						{},
						{},
						{
							default: () => {
								return `<title>Project list</title>
					${validate_component(Row, 'Row').$$render(
						$$result,
						{},
						{},
						{
							default: () => {
								return `${validate_component(Cell, 'Cell').$$render(
									$$result,
									{ numeric: true, style: 'width: 5%' },
									{},
									{
										default: () => {
											return `ID`;
										}
									}
								)}
						${validate_component(Cell, 'Cell').$$render(
							$$result,
							{ style: 'width: 30%' },
							{},
							{
								default: () => {
									return `Employee`;
								}
							}
						)}
						${validate_component(Cell, 'Cell').$$render(
							$$result,
							{ style: 'width: 60%' },
							{},
							{
								default: () => {
									return `Project`;
								}
							}
						)}
						${validate_component(Cell, 'Cell').$$render($$result, {}, {}, {})}`;
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
							return `${each(projectMemberList, (projectMember) => {
								return `${validate_component(Row, 'Row').$$render(
									$$result,
									{},
									{},
									{
										default: () => {
											return `${validate_component(Cell, 'Cell').$$render(
												$$result,
												{ numeric: true },
												{},
												{
													default: () => {
														return `${escape(projectMember.projectMemberId)}`;
													}
												}
											)}
							${validate_component(Cell, 'Cell').$$render(
								$$result,
								{},
								{},
								{
									default: () => {
										return `${escape(projectMember.user.firstName)} ${escape(
											projectMember.user.lastName
										)}`;
									}
								}
							)}
							${validate_component(Cell, 'Cell').$$render(
								$$result,
								{},
								{},
								{
									default: () => {
										return `${escape(projectMember.project.projectName)}`;
									}
								}
							)}
							${validate_component(Cell, 'Cell').$$render(
								$$result,
								{},
								{},
								{
									default: () => {
										return `${validate_component(Button, 'Button').$$render(
											$$result,
											{ disabled: !loading },
											{},
											{
												default: () => {
													return `${validate_component(Index, 'Icon').$$render(
														$$result,
														{ path: mdiDeleteEmpty },
														{},
														{}
													)}
									${validate_component(CommonLabel, 'Label').$$render(
										$$result,
										{ style: 'margin-left: 5px' },
										{},
										{
											default: () => {
												return `Delete`;
											}
										}
									)}
								`;
												}
											}
										)}
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

	${validate_component(ProjectMemberDeleteConfirmation, 'ProjectMemberDeleteConfirmation').$$render(
		$$result,
		{
			openDeleteDialog,
			selectedProjectMemberForDelete
		},
		{
			openDeleteDialog: ($$value) => {
				openDeleteDialog = $$value;
				$$settled = false;
			},
			selectedProjectMemberForDelete: ($$value) => {
				selectedProjectMemberForDelete = $$value;
				$$settled = false;
			}
		},
		{}
	)}

	${validate_component(ProjectMemberCreateDialog, 'ProjectMemberCreateDialog').$$render(
		$$result,
		{
			openCreateDialog,
			loadingDialog: loading,
			allProjects: projectList,
			allProjectMembers: projectMemberList,
			allUsers: userList
		},
		{
			openCreateDialog: ($$value) => {
				openCreateDialog = $$value;
				$$settled = false;
			},
			loadingDialog: ($$value) => {
				loading = $$value;
				$$settled = false;
			},
			allProjects: ($$value) => {
				projectList = $$value;
				$$settled = false;
			},
			allProjectMembers: ($$value) => {
				projectMemberList = $$value;
				$$settled = false;
			},
			allUsers: ($$value) => {
				userList = $$value;
				$$settled = false;
			}
		},
		{}
	)}
</div>`;
	} while (!$$settled);
	$$unsubscribe_userStore();
	return $$rendered;
});
export { Page as default };
