import {
	c as create_ssr_component,
	b as compute_rest_props,
	d as get_current_component,
	a as subscribe,
	g as getContext,
	s as setContext,
	o as onDestroy,
	k as set_store_value,
	f as spread,
	h as escape_attribute_value,
	i as escape_object,
	j as add_attribute
} from './index3.js';
import { w as writable } from './index2.js';
import {
	f as forwardEventsBuilder,
	c as classMap,
	e as exclude,
	p as prefixFilter,
	a as classAdderBuilder
} from './Ripple.js';
const Dialog = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $$restProps = compute_rest_props($$props, [
		'use',
		'class',
		'open',
		'selection',
		'escapeKeyAction',
		'scrimClickAction',
		'autoStackButtons',
		'fullscreen',
		'sheet',
		'noContentPadding',
		'container$class',
		'surface$class',
		'isOpen',
		'setOpen',
		'layout',
		'getElement'
	]);
	let $aboveFullscreenShown, $$unsubscribe_aboveFullscreenShown;
	let $actionButtonsReversed, $$unsubscribe_actionButtonsReversed;
	var _a;
	forwardEventsBuilder(get_current_component());
	let { use = [] } = $$props;
	let { class: className = '' } = $$props;
	let { open = false } = $$props;
	let { selection = false } = $$props;
	let { escapeKeyAction = 'close' } = $$props;
	let { scrimClickAction = 'close' } = $$props;
	let { autoStackButtons = true } = $$props;
	let { fullscreen = false } = $$props;
	let { sheet = false } = $$props;
	let { noContentPadding = false } = $$props;
	let { container$class = '' } = $$props;
	let { surface$class = '' } = $$props;
	let element;
	let instance;
	let internalClasses = {};
	let actionButtonsReversed = writable(false);
	$$unsubscribe_actionButtonsReversed = subscribe(
		actionButtonsReversed,
		(value) => ($actionButtonsReversed = value)
	);
	let aboveFullscreen = getContext('SMUI:dialog:aboveFullscreen');
	let aboveFullscreenShown =
		(_a = getContext('SMUI:dialog:aboveFullscreenShown')) !== null && _a !== void 0
			? _a
			: writable(false);
	$$unsubscribe_aboveFullscreenShown = subscribe(
		aboveFullscreenShown,
		(value) => ($aboveFullscreenShown = value)
	);
	let addLayoutListener = getContext('SMUI:addLayoutListener');
	let removeLayoutListener;
	let addLayoutListenerFn = (listener) => {
		return () => {};
	};
	setContext('SMUI:dialog:actions:reversed', actionButtonsReversed);
	setContext('SMUI:addLayoutListener', addLayoutListenerFn);
	setContext('SMUI:dialog:selection', selection);
	setContext('SMUI:dialog:aboveFullscreen', aboveFullscreen || fullscreen);
	setContext('SMUI:dialog:aboveFullscreenShown', aboveFullscreenShown);
	if (sheet) {
		setContext('SMUI:icon-button:context', 'dialog:sheet');
	}
	if (addLayoutListener) {
		removeLayoutListener = addLayoutListener(layout);
	}
	let previousAboveFullscreenShown = $aboveFullscreenShown;
	onDestroy(() => {
		if (removeLayoutListener) {
			removeLayoutListener();
		}
	});
	function isOpen() {
		return open;
	}
	function setOpen(value) {
		open = value;
	}
	function layout() {
		return instance.layout();
	}
	function getElement() {
		return element;
	}
	if ($$props.use === void 0 && $$bindings.use && use !== void 0) $$bindings.use(use);
	if ($$props.class === void 0 && $$bindings.class && className !== void 0)
		$$bindings.class(className);
	if ($$props.open === void 0 && $$bindings.open && open !== void 0) $$bindings.open(open);
	if ($$props.selection === void 0 && $$bindings.selection && selection !== void 0)
		$$bindings.selection(selection);
	if (
		$$props.escapeKeyAction === void 0 &&
		$$bindings.escapeKeyAction &&
		escapeKeyAction !== void 0
	)
		$$bindings.escapeKeyAction(escapeKeyAction);
	if (
		$$props.scrimClickAction === void 0 &&
		$$bindings.scrimClickAction &&
		scrimClickAction !== void 0
	)
		$$bindings.scrimClickAction(scrimClickAction);
	if (
		$$props.autoStackButtons === void 0 &&
		$$bindings.autoStackButtons &&
		autoStackButtons !== void 0
	)
		$$bindings.autoStackButtons(autoStackButtons);
	if ($$props.fullscreen === void 0 && $$bindings.fullscreen && fullscreen !== void 0)
		$$bindings.fullscreen(fullscreen);
	if ($$props.sheet === void 0 && $$bindings.sheet && sheet !== void 0) $$bindings.sheet(sheet);
	if (
		$$props.noContentPadding === void 0 &&
		$$bindings.noContentPadding &&
		noContentPadding !== void 0
	)
		$$bindings.noContentPadding(noContentPadding);
	if (
		$$props.container$class === void 0 &&
		$$bindings.container$class &&
		container$class !== void 0
	)
		$$bindings.container$class(container$class);
	if ($$props.surface$class === void 0 && $$bindings.surface$class && surface$class !== void 0)
		$$bindings.surface$class(surface$class);
	if ($$props.isOpen === void 0 && $$bindings.isOpen && isOpen !== void 0)
		$$bindings.isOpen(isOpen);
	if ($$props.setOpen === void 0 && $$bindings.setOpen && setOpen !== void 0)
		$$bindings.setOpen(setOpen);
	if ($$props.layout === void 0 && $$bindings.layout && layout !== void 0)
		$$bindings.layout(layout);
	if ($$props.getElement === void 0 && $$bindings.getElement && getElement !== void 0)
		$$bindings.getElement(getElement);
	{
		if (!autoStackButtons) {
			set_store_value(
				actionButtonsReversed,
				($actionButtonsReversed = true),
				$actionButtonsReversed
			);
		}
	}
	{
		if (fullscreen && instance && previousAboveFullscreenShown !== $aboveFullscreenShown) {
			previousAboveFullscreenShown = $aboveFullscreenShown;
			if ($aboveFullscreenShown) {
				instance.showSurfaceScrim();
			} else {
				instance.hideSurfaceScrim();
			}
		}
	}
	$$unsubscribe_aboveFullscreenShown();
	$$unsubscribe_actionButtonsReversed();
	return `


<div${spread(
		[
			{
				class: escape_attribute_value(
					classMap({
						[className]: true,
						'mdc-dialog': true,
						'mdc-dialog--stacked': !autoStackButtons,
						'mdc-dialog--fullscreen': fullscreen,
						'mdc-dialog--sheet': sheet,
						'mdc-dialog--no-content-padding': noContentPadding,
						'smui-dialog--selection': selection,
						...internalClasses
					})
				)
			},
			{ role: 'alertdialog' },
			{ 'aria-modal': 'true' },
			escape_object(exclude($$restProps, ['container$', 'surface$']))
		],
		{}
	)}${add_attribute('this', element, 0)}><div${spread(
		[
			{
				class: escape_attribute_value(
					classMap({
						[container$class]: true,
						'mdc-dialog__container': true
					})
				)
			},
			escape_object(prefixFilter($$restProps, 'container$'))
		],
		{}
	)}><div${spread(
		[
			{
				class: escape_attribute_value(
					classMap({
						[surface$class]: true,
						'mdc-dialog__surface': true
					})
				)
			},
			{ role: 'alertdialog' },
			{ 'aria-modal': 'true' },
			escape_object(prefixFilter($$restProps, 'surface$'))
		],
		{}
	)}>${slots.default ? slots.default({}) : ``}
      ${fullscreen ? `<div class="mdc-dialog__surface-scrim"></div>` : ``}</div></div>
  <div class="mdc-dialog__scrim"></div></div>

${slots.over ? slots.over({}) : ``}`;
});
classAdderBuilder({
	class: 'mdc-dialog__header',
	tag: 'div',
	contexts: {
		'SMUI:icon-button:context': 'dialog:header'
	}
});
const Title = classAdderBuilder({
	class: 'mdc-dialog__title',
	tag: 'h2'
});
const Content = classAdderBuilder({
	class: 'mdc-dialog__content',
	tag: 'div'
});
const Actions = classAdderBuilder({
	class: 'mdc-dialog__actions',
	tag: 'div',
	classMap: {
		'smui-dialog__actions--reversed': 'SMUI:dialog:actions:reversed'
	},
	contexts: {
		'SMUI:button:context': 'dialog:action'
	}
});
export { Actions as A, Content as C, Dialog as D, Title as T };
