import {
	c as create_ssr_component,
	a as subscribe,
	q as createEventDispatcher,
	v as validate_component,
	l as each,
	e as escape
} from '../../../../chunks/index3.js';
import { u as userStore, C as CommonLabel } from '../../../../chunks/user.js';
import {
	C as Card,
	D as DataTable,
	H as Head,
	R as Row,
	a as Cell,
	B as Body
} from '../../../../chunks/NotchedOutline.js';
import { S as Select, O as Option } from '../../../../chunks/Option.js';
import '../../../../chunks/Toaster.svelte_svelte_type_style_lang.js';
import { B as Button } from '../../../../chunks/Button.js';
import { D as Dialog, T as Title, C as Content, A as Actions } from '../../../../chunks/Actions.js';
import { I as Index } from '../../../../chunks/Index4.js';
import {
	mdiCheckCircleOutline,
	mdiMinusCircleOutline,
	mdiCashCheck,
	mdiCheckDecagramOutline,
	mdiDelete
} from '@mdi/js';
const TimeLogDeleteConfirmation = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $$unsubscribe_userStore;
	$$unsubscribe_userStore = subscribe(userStore, (value) => value);
	createEventDispatcher();
	let { openDeleteDialog = false } = $$props;
	let { selectedTimeLogForDelete } = $$props;
	if (
		$$props.openDeleteDialog === void 0 &&
		$$bindings.openDeleteDialog &&
		openDeleteDialog !== void 0
	)
		$$bindings.openDeleteDialog(openDeleteDialog);
	if (
		$$props.selectedTimeLogForDelete === void 0 &&
		$$bindings.selectedTimeLogForDelete &&
		selectedTimeLogForDelete !== void 0
	)
		$$bindings.selectedTimeLogForDelete(selectedTimeLogForDelete);
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
								return `TimeLog Delete Confirmation`;
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
					return `Are you sure to delete this timelog?`;
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
});
const TimeLogApproveConfirmation = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $$unsubscribe_userStore;
	$$unsubscribe_userStore = subscribe(userStore, (value) => value);
	createEventDispatcher();
	let { openApproveDialog = false } = $$props;
	let { selectedTimeLogForApprove } = $$props;
	if (
		$$props.openApproveDialog === void 0 &&
		$$bindings.openApproveDialog &&
		openApproveDialog !== void 0
	)
		$$bindings.openApproveDialog(openApproveDialog);
	if (
		$$props.selectedTimeLogForApprove === void 0 &&
		$$bindings.selectedTimeLogForApprove &&
		selectedTimeLogForApprove !== void 0
	)
		$$bindings.selectedTimeLogForApprove(selectedTimeLogForApprove);
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
				open: openApproveDialog
			},
			{
				open: ($$value) => {
					openApproveDialog = $$value;
					$$settled = false;
				}
			},
			{
				default: () => {
					return `${validate_component(Title, 'Title').$$render(
						$$result,
						{
							id: 'mandatory-title',
							'data-testid': 'mandatory-title-approve'
						},
						{},
						{
							default: () => {
								return `TimeLog Approve Confirmation`;
							}
						}
					)}
		${validate_component(Content, 'Content').$$render(
			$$result,
			{
				id: 'mandatory-content',
				'data-testid': 'mandatory-content-approve'
			},
			{},
			{
				default: () => {
					return `Are you sure to approve this timelog?`;
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
							'data-testid': 'approve-close-button'
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
					'data-testid': 'approve-confirm-button'
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
});
const TimeLogMarkPaidConfirmation = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $$unsubscribe_userStore;
	$$unsubscribe_userStore = subscribe(userStore, (value) => value);
	createEventDispatcher();
	let { openMarkPaidDialog = false } = $$props;
	let { selectedTimeLogForMarkPaid } = $$props;
	if (
		$$props.openMarkPaidDialog === void 0 &&
		$$bindings.openMarkPaidDialog &&
		openMarkPaidDialog !== void 0
	)
		$$bindings.openMarkPaidDialog(openMarkPaidDialog);
	if (
		$$props.selectedTimeLogForMarkPaid === void 0 &&
		$$bindings.selectedTimeLogForMarkPaid &&
		selectedTimeLogForMarkPaid !== void 0
	)
		$$bindings.selectedTimeLogForMarkPaid(selectedTimeLogForMarkPaid);
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
				open: openMarkPaidDialog
			},
			{
				open: ($$value) => {
					openMarkPaidDialog = $$value;
					$$settled = false;
				}
			},
			{
				default: () => {
					return `${validate_component(Title, 'Title').$$render(
						$$result,
						{
							id: 'mandatory-title',
							'data-testid': 'mandatory-title-mark-paid'
						},
						{},
						{
							default: () => {
								return `TimeLog Mark as Paid Confirmation`;
							}
						}
					)}
		${validate_component(Content, 'Content').$$render(
			$$result,
			{
				id: 'mandatory-content',
				'data-testid': 'mandatory-content-mark-paid'
			},
			{},
			{
				default: () => {
					return `Are you sure to mark this timelog as paid?`;
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
							'data-testid': 'mark-paid-close-button'
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
					'data-testid': 'mark-paid-confirm-button'
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
});
const _page_svelte_svelte_type_style_lang = '';
const css = {
	code: '.container.svelte-1vjyxlh.mdc-card{padding:20px}.table-container.svelte-1vjyxlh{width:100%;max-height:75vh;overflow-y:auto}',
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
	let userList = [];
	let selectedProject = ' ';
	let selectedUser = ' ';
	let openDeleteDialog = false;
	let selectedTimeLogForDelete;
	let openApproveDialog = false;
	let selectedTimeLogForApprove;
	let openMarkPaidDialog = false;
	let selectedTimeLogForMarkPaid;
	let sort = 'timestamp';
	let sortDirection = 'ascending';
	const getTimeLogsByUserAndProject = () => {
		if (selectedUser === ' ' && selectedProject === ' ') {
			return (filteredTimeLogs = timelogs);
		} else if (selectedProject === ' ' && selectedUser !== ' ') {
			return (filteredTimeLogs = timelogs.filter(
				(timelog) => timelog.userId.firstName + timelog.userId.lastName === selectedUser
			));
		} else if (selectedUser === ' ' && selectedProject !== ' ') {
			return (filteredTimeLogs = timelogs.filter(
				(timelog) => timelog.projectId.projectName === selectedProject
			));
		}
		return (filteredTimeLogs = timelogs.filter(
			(timelog) =>
				timelog.userId.firstName + timelog.userId.lastName === selectedUser &&
				timelog.projectId.projectName === selectedProject
		));
	};
	$$result.css.add(css);
	let $$settled;
	let $$rendered;
	do {
		$$settled = true;
		{
			if (selectedUser || selectedProject) {
				getTimeLogsByUserAndProject();
			}
		}
		$$rendered = `<div class="container svelte-1vjyxlh">${validate_component(Card, 'Card').$$render(
			$$result,
			{ style: 'padding: 20px;' },
			{},
			{
				default: () => {
					return `<div style="margin-bottom: 16px"><h2 class="mdc-typography--headline6" style="margin-top: 0;">Timelog Management</h2>
			${validate_component(Select, 'Select').$$render(
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
						return `${validate_component(Option, 'Option').$$render(
							$$result,
							{ value: ' ' },
							{},
							{}
						)}
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
			)}
			${validate_component(Select, 'Select').$$render(
				$$result,
				{
					class: 'shaped-outlined',
					variant: 'outlined',
					label: 'Filter by User',
					value: selectedUser
				},
				{
					value: ($$value) => {
						selectedUser = $$value;
						$$settled = false;
					}
				},
				{
					default: () => {
						return `${validate_component(Option, 'Option').$$render(
							$$result,
							{ value: ' ' },
							{},
							{}
						)}
				${each(userList, (user) => {
					return `${validate_component(Option, 'Option').$$render(
						$$result,
						{ value: user.firstName + user.lastName },
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
			)}</div>
		<div class="table-container svelte-1vjyxlh">${validate_component(DataTable, 'DataTable').$$render(
			$$result,
			{
				style: 'width: 100%;',
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
									{ columnId: 'employee' },
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
								columnId: 'project',
								style: 'width: 10%;'
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
							{
								columnId: 'project',
								style: 'width: 100%;'
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
						)}
						${validate_component(Cell, 'Cell').$$render(
							$$result,
							{ columnId: 'actions' },
							{},
							{
								default: () => {
									return `${validate_component(CommonLabel, 'Label').$$render(
										$$result,
										{},
										{},
										{
											default: () => {
												return `Actions`;
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
														return `${escape(timelog.userId.firstName)} ${escape(
															timelog.userId.lastName
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
										return `${escape(timelog.projectId.projectName)}`;
									}
								}
							)}
							${validate_component(Cell, 'Cell').$$render(
								$$result,
								{ style: 'width: 10px' },
								{},
								{
									default: () => {
										return `<span style="word-break: break-all">${escape(timelog.message)}</span>
							`;
									}
								}
							)}
							${validate_component(Cell, 'Cell').$$render(
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
										return `<div style="display: flex; justify-content: center">${
											timelog.approved
												? `${validate_component(Index, 'Icon').$$render(
														$$result,
														{
															path: mdiCheckCircleOutline,
															color: 'green'
														},
														{},
														{}
												  )}`
												: `${validate_component(Index, 'Icon').$$render(
														$$result,
														{
															path: mdiMinusCircleOutline,
															color: 'red'
														},
														{},
														{}
												  )}`
										}</div>
							`;
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
												? `${
														timelog.paid
															? `${validate_component(Button, 'Button').$$render(
																	$$result,
																	{
																		color: 'secondary',
																		disabled: true,
																		variant: 'raised'
																	},
																	{},
																	{
																		default: () => {
																			return `${validate_component(Index, 'Icon').$$render(
																				$$result,
																				{ path: mdiCashCheck },
																				{},
																				{}
																			)}
											${validate_component(CommonLabel, 'Label').$$render(
												$$result,
												{ style: 'padding-left: 3px;' },
												{},
												{
													default: () => {
														return `Mark as Paid`;
													}
												}
											)}
										`;
																		}
																	}
															  )}`
															: `${validate_component(Button, 'Button').$$render(
																	$$result,
																	{ color: 'secondary', variant: 'raised' },
																	{},
																	{
																		default: () => {
																			return `${validate_component(Index, 'Icon').$$render(
																				$$result,
																				{ path: mdiCashCheck },
																				{},
																				{}
																			)}
											${validate_component(CommonLabel, 'Label').$$render(
												$$result,
												{ style: 'padding-left: 3px;' },
												{},
												{
													default: () => {
														return `Mark as Paid`;
													}
												}
											)}
										`;
																		}
																	}
															  )}`
												  }
									${validate_component(Button, 'Button').$$render(
										$$result,
										{
											color: 'secondary',
											disabled: true,
											variant: 'raised'
										},
										{},
										{
											default: () => {
												return `${validate_component(Index, 'Icon').$$render(
													$$result,
													{ path: mdiCheckDecagramOutline },
													{},
													{}
												)}
										${validate_component(CommonLabel, 'Label').$$render(
											$$result,
											{ style: 'padding-left: 3px;' },
											{},
											{
												default: () => {
													return `Approve`;
												}
											}
										)}
									`;
											}
										}
									)}
									${validate_component(Button, 'Button').$$render(
										$$result,
										{ disabled: true, variant: 'raised' },
										{},
										{
											default: () => {
												return `${validate_component(Index, 'Icon').$$render(
													$$result,
													{ path: mdiDelete },
													{},
													{}
												)}
										${validate_component(CommonLabel, 'Label').$$render(
											$$result,
											{ style: 'padding-left: 3px;' },
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
									)}`
												: `${validate_component(Button, 'Button').$$render(
														$$result,
														{
															color: 'secondary',
															disabled: true,
															variant: 'raised'
														},
														{},
														{
															default: () => {
																return `${validate_component(Index, 'Icon').$$render(
																	$$result,
																	{ path: mdiCashCheck },
																	{},
																	{}
																)}
										${validate_component(CommonLabel, 'Label').$$render(
											$$result,
											{ style: 'padding-left: 3px;' },
											{},
											{
												default: () => {
													return `Mark as Paid`;
												}
											}
										)}
									`;
															}
														}
												  )}
									${validate_component(Button, 'Button').$$render(
										$$result,
										{ color: 'secondary', variant: 'raised' },
										{},
										{
											default: () => {
												return `${validate_component(Index, 'Icon').$$render(
													$$result,
													{ path: mdiCheckDecagramOutline },
													{},
													{}
												)}
										${validate_component(CommonLabel, 'Label').$$render(
											$$result,
											{ style: 'padding-left: 3px;' },
											{},
											{
												default: () => {
													return `Approve`;
												}
											}
										)}
									`;
											}
										}
									)}
									${validate_component(Button, 'Button').$$render(
										$$result,
										{ variant: 'raised' },
										{},
										{
											default: () => {
												return `${validate_component(Index, 'Icon').$$render(
													$$result,
													{ path: mdiDelete },
													{},
													{}
												)}
										${validate_component(CommonLabel, 'Label').$$render(
											$$result,
											{ style: 'padding-left: 3px;' },
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
		)}</div>
		${validate_component(TimeLogDeleteConfirmation, 'TimeLogDeleteConfirmation').$$render(
			$$result,
			{
				openDeleteDialog,
				selectedTimeLogForDelete
			},
			{
				openDeleteDialog: ($$value) => {
					openDeleteDialog = $$value;
					$$settled = false;
				},
				selectedTimeLogForDelete: ($$value) => {
					selectedTimeLogForDelete = $$value;
					$$settled = false;
				}
			},
			{}
		)}
		${validate_component(TimeLogApproveConfirmation, 'TimeLogApproveConfirmation').$$render(
			$$result,
			{
				openApproveDialog,
				selectedTimeLogForApprove
			},
			{
				openApproveDialog: ($$value) => {
					openApproveDialog = $$value;
					$$settled = false;
				},
				selectedTimeLogForApprove: ($$value) => {
					selectedTimeLogForApprove = $$value;
					$$settled = false;
				}
			},
			{}
		)}
		${validate_component(TimeLogMarkPaidConfirmation, 'TimeLogMarkPaidConfirmation').$$render(
			$$result,
			{
				openMarkPaidDialog,
				selectedTimeLogForMarkPaid
			},
			{
				openMarkPaidDialog: ($$value) => {
					openMarkPaidDialog = $$value;
					$$settled = false;
				},
				selectedTimeLogForMarkPaid: ($$value) => {
					selectedTimeLogForMarkPaid = $$value;
					$$settled = false;
				}
			},
			{}
		)}`;
				}
			}
		)}
</div>`;
	} while (!$$settled);
	$$unsubscribe_userStore();
	return $$rendered;
});
export { Page as default };
