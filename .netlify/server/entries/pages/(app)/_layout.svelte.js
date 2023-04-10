import {
	c as create_ssr_component,
	b as compute_rest_props,
	d as get_current_component,
	g as getContext,
	a as subscribe,
	o as onDestroy,
	f as spread,
	h as escape_attribute_value,
	i as escape_object,
	j as add_attribute,
	s as setContext,
	k as set_store_value,
	v as validate_component,
	l as each,
	e as escape
} from '../../../chunks/index3.js';
import '../../../chunks/Toaster.svelte_svelte_type_style_lang.js';
import { T as Toaster } from '../../../chunks/Toaster.js';
import {
	f as forwardEventsBuilder,
	c as classMap,
	e as exclude,
	p as prefixFilter,
	a as classAdderBuilder
} from '../../../chunks/Ripple.js';
import { w as writable } from '../../../chunks/index2.js';
import { MDCDismissibleDrawerFoundation, MDCModalDrawerFoundation } from '@material/drawer';
import { d as dispatch, L as List, I as Item } from '../../../chunks/Subheader.js';
import { I as Index } from '../../../chunks/Index4.js';
import {
	mdiHome,
	mdiCheckCircleOutline,
	mdiTimerSandComplete,
	mdiFolderEdit,
	mdiAccountEdit
} from '@mdi/js';
let counter = 0;
const Tooltip = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $$restProps = compute_rest_props($$props, [
		'use',
		'class',
		'style',
		'id',
		'unbounded',
		'xPos',
		'yPos',
		'persistent',
		'interactive',
		'hideFromScreenreader',
		'showDelay',
		'hideDelay',
		'surface$class',
		'surface$style',
		'attachScrollHandler',
		'removeScrollHandler',
		'getElement'
	]);
	let $$unsubscribe_anchor;
	let $$unsubscribe_tooltip;
	forwardEventsBuilder(get_current_component());
	let { use = [] } = $$props;
	let { class: className = '' } = $$props;
	let { style = '' } = $$props;
	let { id = 'SMUI-tooltip-' + counter++ } = $$props;
	let { unbounded = false } = $$props;
	let { xPos = 'detected' } = $$props;
	let { yPos = 'detected' } = $$props;
	let { persistent = false } = $$props;
	let { interactive = persistent } = $$props;
	let { hideFromScreenreader = false } = $$props;
	let { showDelay = void 0 } = $$props;
	let { hideDelay = void 0 } = $$props;
	let { surface$class = '' } = $$props;
	let { surface$style = '' } = $$props;
	let element;
	let nonReactiveLocationStore = {
		setParent(value) {
			Object.defineProperty(this, 'parent', { value });
		},
		setNextSibling(value) {
			Object.defineProperty(this, 'nextSibling', { value });
		}
	};
	let internalClasses = {};
	let internalStyles = {};
	let internalAttrs = {};
	let surfaceAnimationStyles = {};
	let anchor = getContext('SMUI:tooltip:wrapper:anchor');
	$$unsubscribe_anchor = subscribe(anchor, (value) => value);
	let tooltip = getContext('SMUI:tooltip:wrapper:tooltip');
	$$unsubscribe_tooltip = subscribe(tooltip, (value) => value);
	const rich = getContext('SMUI:tooltip:rich');
	onDestroy(() => {
		var _a;
		if (
			!rich &&
			typeof document !== 'undefined' &&
			document.body === getElement().parentElement &&
			nonReactiveLocationStore.parent !== getElement().parentElement &&
			((_a = nonReactiveLocationStore.parent) === null || _a === void 0
				? void 0
				: _a.insertBefore) &&
			nonReactiveLocationStore.nextSibling
		) {
			nonReactiveLocationStore.parent.insertBefore(
				getElement(),
				nonReactiveLocationStore.nextSibling
			);
		}
	});
	function attachScrollHandler(addEventListenerFn) {}
	function removeScrollHandler(removeEventHandlerFn) {}
	function getElement() {
		return element;
	}
	if ($$props.use === void 0 && $$bindings.use && use !== void 0) $$bindings.use(use);
	if ($$props.class === void 0 && $$bindings.class && className !== void 0)
		$$bindings.class(className);
	if ($$props.style === void 0 && $$bindings.style && style !== void 0) $$bindings.style(style);
	if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
	if ($$props.unbounded === void 0 && $$bindings.unbounded && unbounded !== void 0)
		$$bindings.unbounded(unbounded);
	if ($$props.xPos === void 0 && $$bindings.xPos && xPos !== void 0) $$bindings.xPos(xPos);
	if ($$props.yPos === void 0 && $$bindings.yPos && yPos !== void 0) $$bindings.yPos(yPos);
	if ($$props.persistent === void 0 && $$bindings.persistent && persistent !== void 0)
		$$bindings.persistent(persistent);
	if ($$props.interactive === void 0 && $$bindings.interactive && interactive !== void 0)
		$$bindings.interactive(interactive);
	if (
		$$props.hideFromScreenreader === void 0 &&
		$$bindings.hideFromScreenreader &&
		hideFromScreenreader !== void 0
	)
		$$bindings.hideFromScreenreader(hideFromScreenreader);
	if ($$props.showDelay === void 0 && $$bindings.showDelay && showDelay !== void 0)
		$$bindings.showDelay(showDelay);
	if ($$props.hideDelay === void 0 && $$bindings.hideDelay && hideDelay !== void 0)
		$$bindings.hideDelay(hideDelay);
	if ($$props.surface$class === void 0 && $$bindings.surface$class && surface$class !== void 0)
		$$bindings.surface$class(surface$class);
	if ($$props.surface$style === void 0 && $$bindings.surface$style && surface$style !== void 0)
		$$bindings.surface$style(surface$style);
	if (
		$$props.attachScrollHandler === void 0 &&
		$$bindings.attachScrollHandler &&
		attachScrollHandler !== void 0
	)
		$$bindings.attachScrollHandler(attachScrollHandler);
	if (
		$$props.removeScrollHandler === void 0 &&
		$$bindings.removeScrollHandler &&
		removeScrollHandler !== void 0
	)
		$$bindings.removeScrollHandler(removeScrollHandler);
	if ($$props.getElement === void 0 && $$bindings.getElement && getElement !== void 0)
		$$bindings.getElement(getElement);
	$$unsubscribe_anchor();
	$$unsubscribe_tooltip();
	return `<div${spread(
		[
			{
				class: escape_attribute_value(
					classMap({
						[className]: true,
						'mdc-tooltip': true,
						'mdc-tooltip--rich': rich,
						...internalClasses
					})
				)
			},
			{
				style: escape_attribute_value(
					Object.entries(internalStyles)
						.map(([name, value]) => `${name}: ${value};`)
						.concat([style])
						.join(' ')
				)
			},
			{
				role: escape_attribute_value(rich && interactive ? 'dialog' : 'tooltip')
			},
			{ 'aria-hidden': 'true' },
			{ id: escape_attribute_value(id) },
			{
				tabindex: escape_attribute_value(rich && persistent ? -1 : void 0)
			},
			{
				'data-mdc-tooltip-persist': escape_attribute_value(rich && persistent ? 'true' : void 0)
			},
			{
				'data-mdc-tooltip-persistent': escape_attribute_value(
					/* MDC uses this attr, but document the one above */
					rich && persistent ? 'true' : void 0
				)
			},
			{
				'data-mdc-tooltip-has-caret': escape_attribute_value(void 0)
			},
			{
				'data-hide-tooltip-from-screenreader': escape_attribute_value(
					hideFromScreenreader ? 'true' : void 0
				)
			},
			escape_object(internalAttrs),
			escape_object(exclude($$restProps, ['surface$']))
		],
		{}
	)}${add_attribute('this', element, 0)}><div${spread(
		[
			{
				class: escape_attribute_value(
					classMap({
						[surface$class]: true,
						'mdc-tooltip__surface': true,
						'mdc-tooltip__surface-animation': true
					})
				)
			},
			{
				style: escape_attribute_value(
					Object.entries(surfaceAnimationStyles)
						.map(([name, value]) => `${name}: ${value};`)
						.concat([surface$style])
						.join(' ')
				)
			},
			escape_object(prefixFilter($$restProps, 'surface$'))
		],
		{}
	)}>${slots.default ? slots.default({}) : ``}</div>
</div>`;
});
const Wrapper = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $$restProps = compute_rest_props($$props, ['use', 'class', 'rich', 'getElement']);
	let $tooltip, $$unsubscribe_tooltip;
	let $anchor, $$unsubscribe_anchor;
	forwardEventsBuilder(get_current_component());
	let { use = [] } = $$props;
	let { class: className = '' } = $$props;
	let { rich = false } = $$props;
	let element;
	const anchor = writable(void 0);
	$$unsubscribe_anchor = subscribe(anchor, (value) => ($anchor = value));
	const tooltip = writable(void 0);
	$$unsubscribe_tooltip = subscribe(tooltip, (value) => ($tooltip = value));
	setContext('SMUI:tooltip:wrapper:anchor', anchor);
	setContext('SMUI:tooltip:wrapper:tooltip', tooltip);
	setContext('SMUI:tooltip:rich', rich);
	function getElement() {
		return element;
	}
	if ($$props.use === void 0 && $$bindings.use && use !== void 0) $$bindings.use(use);
	if ($$props.class === void 0 && $$bindings.class && className !== void 0)
		$$bindings.class(className);
	if ($$props.rich === void 0 && $$bindings.rich && rich !== void 0) $$bindings.rich(rich);
	if ($$props.getElement === void 0 && $$bindings.getElement && getElement !== void 0)
		$$bindings.getElement(getElement);
	{
		if ($tooltip && !$anchor) {
			set_store_value(anchor, ($anchor = $tooltip.previousElementSibling), $anchor);
		}
	}
	$$unsubscribe_tooltip();
	$$unsubscribe_anchor();
	return `${
		rich
			? `<div${spread(
					[
						{
							class: escape_attribute_value(
								classMap({
									[className]: true,
									'mdc-tooltip-wrapper--rich': true
								})
							)
						},
						escape_object($$restProps)
					],
					{}
			  )}${add_attribute('this', element, 0)}>${slots.default ? slots.default({}) : ``}</div>`
			: `${slots.default ? slots.default({}) : ``}`
	}`;
});
classAdderBuilder({
	class: 'mdc-tooltip__title',
	tag: 'h2'
});
classAdderBuilder({
	class: 'mdc-tooltip__content',
	tag: 'div'
});
classAdderBuilder({
	class: 'mdc-tooltip__content-link',
	tag: 'a'
});
classAdderBuilder({
	class: 'mdc-tooltip--rich-actions',
	tag: 'div',
	contexts: {
		'SMUI:button:context': 'tooltip:rich-actions'
	}
});
const Drawer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $$restProps = compute_rest_props($$props, [
		'use',
		'class',
		'variant',
		'open',
		'fixed',
		'setOpen',
		'isOpen',
		'getElement'
	]);
	forwardEventsBuilder(get_current_component());
	let { use = [] } = $$props;
	let { class: className = '' } = $$props;
	let { variant = void 0 } = $$props;
	let { open = false } = $$props;
	let { fixed = true } = $$props;
	let element;
	let instance = void 0;
	let internalClasses = {};
	let previousFocus = null;
	let focusTrap;
	let scrim = false;
	setContext('SMUI:list:nav', true);
	setContext('SMUI:list:item:nav', true);
	setContext('SMUI:list:wrapFocus', true);
	let oldVariant = variant;
	onDestroy(() => {
		instance && instance.destroy();
		scrim && scrim.removeEventListener('SMUIDrawerScrim:click', handleScrimClick);
	});
	function getInstance() {
		var _a, _b;
		if (scrim) {
			scrim.removeEventListener('SMUIDrawerScrim:click', handleScrimClick);
		}
		if (variant === 'modal') {
			scrim =
				(_b =
					(_a = element.parentNode) === null || _a === void 0
						? void 0
						: _a.querySelector('.mdc-drawer-scrim')) !== null && _b !== void 0
					? _b
					: false;
			if (scrim) {
				scrim.addEventListener('SMUIDrawerScrim:click', handleScrimClick);
			}
		}
		const Foundation =
			variant === 'dismissible'
				? MDCDismissibleDrawerFoundation
				: variant === 'modal'
				? MDCModalDrawerFoundation
				: void 0;
		return Foundation
			? new Foundation({
					addClass,
					removeClass,
					hasClass,
					elementHasClass: (element2, className2) => element2.classList.contains(className2),
					saveFocus: () => (previousFocus = document.activeElement),
					restoreFocus: () => {
						if (
							previousFocus &&
							'focus' in previousFocus &&
							element.contains(document.activeElement)
						) {
							previousFocus.focus();
						}
					},
					focusActiveNavigationItem: () => {
						const activeNavItemEl = element.querySelector(
							'.mdc-list-item--activated,.mdc-deprecated-list-item--activated'
						);
						if (activeNavItemEl) {
							activeNavItemEl.focus();
						}
					},
					notifyClose: () => {
						open = false;
						dispatch(element, 'SMUIDrawer:closed', void 0, void 0, true);
					},
					notifyOpen: () => {
						open = true;
						dispatch(element, 'SMUIDrawer:opened', void 0, void 0, true);
					},
					trapFocus: () => focusTrap.trapFocus(),
					releaseFocus: () => focusTrap.releaseFocus()
			  })
			: void 0;
	}
	function hasClass(className2) {
		return className2 in internalClasses
			? internalClasses[className2]
			: getElement().classList.contains(className2);
	}
	function addClass(className2) {
		if (!internalClasses[className2]) {
			internalClasses[className2] = true;
		}
	}
	function removeClass(className2) {
		if (!(className2 in internalClasses) || internalClasses[className2]) {
			internalClasses[className2] = false;
		}
	}
	function handleScrimClick() {
		instance && 'handleScrimClick' in instance && instance.handleScrimClick();
	}
	function setOpen(value) {
		open = value;
	}
	function isOpen() {
		return open;
	}
	function getElement() {
		return element;
	}
	if ($$props.use === void 0 && $$bindings.use && use !== void 0) $$bindings.use(use);
	if ($$props.class === void 0 && $$bindings.class && className !== void 0)
		$$bindings.class(className);
	if ($$props.variant === void 0 && $$bindings.variant && variant !== void 0)
		$$bindings.variant(variant);
	if ($$props.open === void 0 && $$bindings.open && open !== void 0) $$bindings.open(open);
	if ($$props.fixed === void 0 && $$bindings.fixed && fixed !== void 0) $$bindings.fixed(fixed);
	if ($$props.setOpen === void 0 && $$bindings.setOpen && setOpen !== void 0)
		$$bindings.setOpen(setOpen);
	if ($$props.isOpen === void 0 && $$bindings.isOpen && isOpen !== void 0)
		$$bindings.isOpen(isOpen);
	if ($$props.getElement === void 0 && $$bindings.getElement && getElement !== void 0)
		$$bindings.getElement(getElement);
	{
		if (oldVariant !== variant) {
			oldVariant = variant;
			instance && instance.destroy();
			internalClasses = {};
			instance = getInstance();
			instance && instance.init();
		}
	}
	{
		if (instance && instance.isOpen() !== open) {
			if (open) {
				instance.open();
			} else {
				instance.close();
			}
		}
	}
	return `<aside${spread(
		[
			{
				class: escape_attribute_value(
					classMap({
						[className]: true,
						'mdc-drawer': true,
						'mdc-drawer--dismissible': variant === 'dismissible',
						'mdc-drawer--modal': variant === 'modal',
						'smui-drawer__absolute': variant === 'modal' && !fixed,
						...internalClasses
					})
				)
			},
			escape_object($$restProps)
		],
		{}
	)}${add_attribute('this', element, 0)}>${slots.default ? slots.default({}) : ``}
</aside>`;
});
const AppContent = classAdderBuilder({
	class: 'mdc-drawer-app-content',
	tag: 'div'
});
const Content = classAdderBuilder({
	class: 'mdc-drawer__content',
	tag: 'div'
});
classAdderBuilder({
	class: 'mdc-drawer__header',
	tag: 'div'
});
classAdderBuilder({
	class: 'mdc-drawer__title',
	tag: 'h1'
});
classAdderBuilder({
	class: 'mdc-drawer__subtitle',
	tag: 'h2'
});
const _layout_svelte_svelte_type_style_lang = '';
const css = {
	code: '.container.svelte-1hdg89 .mdc-drawer{top:0;padding-top:8px;padding-bottom:8px;background:#130f42;width:70px}.container.svelte-1hdg89 .mdc-drawer-app-content{margin-left:90px !important}.logo-size.svelte-1hdg89{width:40px}.center.svelte-1hdg89{display:flex;justify-content:center}.main-content.svelte-1hdg89{overflow:auto;height:100vh;padding:30px 30px 30px 0;box-sizing:border-box}',
	map: null
};
let selectionIndex = 1;
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let active = '';
	let menus = [
		{
			icon: mdiHome,
			path: '/',
			label: 'Dashboard',
			value: 'home'
		},
		{
			icon: mdiCheckCircleOutline,
			path: '/paid-timelog',
			label: 'Paid time log',
			value: 'paid'
		},
		{
			icon: mdiTimerSandComplete,
			path: '/timelog-management',
			label: 'Time Log Management',
			value: 'tm'
		},
		{
			icon: mdiFolderEdit,
			path: '/project-management',
			label: 'Project Management',
			value: 'pm'
		},
		{
			icon: mdiAccountEdit,
			path: '/member-management',
			label: 'Project Member Management',
			value: 'pmm'
		}
	];
	let open = true;
	$$result.css.add(css);
	let $$settled;
	let $$rendered;
	do {
		$$settled = true;
		$$rendered = `${validate_component(Toaster, 'Toaster').$$render($$result, {}, {}, {})}
<div class="container svelte-1hdg89">${validate_component(Drawer, 'Drawer').$$render(
			$$result,
			{ variant: 'dismissible', open },
			{
				open: ($$value) => {
					open = $$value;
					$$settled = false;
				}
			},
			{
				default: () => {
					return `<div class="center svelte-1hdg89"><img src="logo-without-text.png" class="logo-size svelte-1hdg89" alt="logo"></div>
		${validate_component(Content, 'Content').$$render(
			$$result,
			{ class: 'test' },
			{},
			{
				default: () => {
					return `${validate_component(List, 'List').$$render(
						$$result,
						{ selectedIndex: selectionIndex },
						{},
						{
							default: () => {
								return `${each(menus, ({ path, icon, value, label }, index) => {
									return `${validate_component(Wrapper, 'Wrapper').$$render(
										$$result,
										{},
										{},
										{
											default: () => {
												return `${validate_component(Item, 'Item').$$render(
													$$result,
													{
														style: `display: flex; justify-content: center; ${
															active === value ? 'background-color: #51b198;' : ''
														}`,
														activated: active === value,
														selected: selectionIndex === index
													},
													{},
													{
														default: () => {
															return `${validate_component(Index, 'Icon').$$render(
																$$result,
																{ path: icon, color: 'white' },
																{},
																{}
															)}
						`;
														}
													}
												)}
						${validate_component(Tooltip, 'Tooltip').$$render(
							$$result,
							{},
							{},
							{
								default: () => {
									return `${escape(label)}`;
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
		)}`;
				}
			}
		)}

	${validate_component(AppContent, 'AppContent').$$render(
		$$result,
		{},
		{},
		{
			default: () => {
				return `<main class="main-content svelte-1hdg89">${
					slots.default ? slots.default({}) : ``
				}</main>`;
			}
		}
	)}
</div>`;
	} while (!$$settled);
	return $$rendered;
});
export { Layout as default };
