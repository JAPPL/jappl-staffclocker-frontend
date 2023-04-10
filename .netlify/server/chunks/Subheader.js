import {
	c as create_ssr_component,
	b as compute_rest_props,
	d as get_current_component,
	g as getContext,
	s as setContext,
	o as onDestroy,
	v as validate_component,
	m as missing_component,
	r as globals
} from './index3.js';
import {
	f as forwardEventsBuilder,
	c as classMap,
	S as SmuiElement,
	R as Ripple,
	a as classAdderBuilder
} from './Ripple.js';
function dispatch(
	element,
	eventType,
	detail,
	eventInit = { bubbles: true },
	duplicateEventForMDC = false
) {
	if (typeof Event !== 'undefined' && element) {
		const event = new CustomEvent(
			eventType,
			Object.assign(Object.assign({}, eventInit), { detail })
		);
		element === null || element === void 0 ? void 0 : element.dispatchEvent(event);
		if (duplicateEventForMDC && eventType.startsWith('SMUI')) {
			const duplicateEvent = new CustomEvent(
				eventType.replace(/^SMUI/g, () => 'MDC'),
				Object.assign(Object.assign({}, eventInit), { detail })
			);
			element === null || element === void 0 ? void 0 : element.dispatchEvent(duplicateEvent);
			if (duplicateEvent.defaultPrevented) {
				event.preventDefault();
			}
		}
		return event;
	}
}
const List = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $$restProps = compute_rest_props($$props, [
		'use',
		'class',
		'nonInteractive',
		'dense',
		'textualList',
		'avatarList',
		'iconList',
		'imageList',
		'thumbnailList',
		'videoList',
		'twoLine',
		'threeLine',
		'vertical',
		'wrapFocus',
		'singleSelection',
		'disabledItemsFocusable',
		'selectedIndex',
		'radioList',
		'checkList',
		'hasTypeahead',
		'component',
		'tag',
		'layout',
		'setEnabled',
		'getTypeaheadInProgress',
		'getSelectedIndex',
		'getFocusedItemIndex',
		'getElement'
	]);
	var _a;
	const forwardEvents = forwardEventsBuilder(get_current_component());
	let { use = [] } = $$props;
	let { class: className = '' } = $$props;
	let { nonInteractive = false } = $$props;
	let { dense = false } = $$props;
	let { textualList = false } = $$props;
	let { avatarList = false } = $$props;
	let { iconList = false } = $$props;
	let { imageList = false } = $$props;
	let { thumbnailList = false } = $$props;
	let { videoList = false } = $$props;
	let { twoLine = false } = $$props;
	let { threeLine = false } = $$props;
	let { vertical = true } = $$props;
	let {
		wrapFocus = (_a = getContext('SMUI:list:wrapFocus')) !== null && _a !== void 0 ? _a : false
	} = $$props;
	let { singleSelection = false } = $$props;
	let { disabledItemsFocusable = false } = $$props;
	let { selectedIndex = -1 } = $$props;
	let { radioList = false } = $$props;
	let { checkList = false } = $$props;
	let { hasTypeahead = false } = $$props;
	let element;
	let instance;
	let role = getContext('SMUI:list:role');
	let nav = getContext('SMUI:list:nav');
	let selectionDialog = getContext('SMUI:dialog:selection');
	let addLayoutListener = getContext('SMUI:addLayoutListener');
	let removeLayoutListener;
	let { component = SmuiElement } = $$props;
	let { tag = component === SmuiElement ? (nav ? 'nav' : 'ul') : void 0 } = $$props;
	setContext('SMUI:list:nonInteractive', nonInteractive);
	setContext('SMUI:separator:context', 'list');
	if (!role) {
		if (singleSelection) {
			role = 'listbox';
			setContext('SMUI:list:item:role', 'option');
		} else if (radioList) {
			role = 'radiogroup';
			setContext('SMUI:list:item:role', 'radio');
		} else if (checkList) {
			role = 'group';
			setContext('SMUI:list:item:role', 'checkbox');
		} else {
			role = 'list';
			setContext('SMUI:list:item:role', void 0);
		}
	}
	if (addLayoutListener) {
		removeLayoutListener = addLayoutListener(layout);
	}
	onDestroy(() => {
		if (removeLayoutListener) {
			removeLayoutListener();
		}
	});
	function layout() {
		return instance.layout();
	}
	function setEnabled(itemIndex, isEnabled) {
		return instance.setEnabled(itemIndex, isEnabled);
	}
	function getTypeaheadInProgress() {
		return instance.isTypeaheadInProgress();
	}
	function getSelectedIndex() {
		return instance.getSelectedIndex();
	}
	function getFocusedItemIndex() {
		return instance.getFocusedItemIndex();
	}
	function getElement() {
		return element.getElement();
	}
	if ($$props.use === void 0 && $$bindings.use && use !== void 0) $$bindings.use(use);
	if ($$props.class === void 0 && $$bindings.class && className !== void 0)
		$$bindings.class(className);
	if ($$props.nonInteractive === void 0 && $$bindings.nonInteractive && nonInteractive !== void 0)
		$$bindings.nonInteractive(nonInteractive);
	if ($$props.dense === void 0 && $$bindings.dense && dense !== void 0) $$bindings.dense(dense);
	if ($$props.textualList === void 0 && $$bindings.textualList && textualList !== void 0)
		$$bindings.textualList(textualList);
	if ($$props.avatarList === void 0 && $$bindings.avatarList && avatarList !== void 0)
		$$bindings.avatarList(avatarList);
	if ($$props.iconList === void 0 && $$bindings.iconList && iconList !== void 0)
		$$bindings.iconList(iconList);
	if ($$props.imageList === void 0 && $$bindings.imageList && imageList !== void 0)
		$$bindings.imageList(imageList);
	if ($$props.thumbnailList === void 0 && $$bindings.thumbnailList && thumbnailList !== void 0)
		$$bindings.thumbnailList(thumbnailList);
	if ($$props.videoList === void 0 && $$bindings.videoList && videoList !== void 0)
		$$bindings.videoList(videoList);
	if ($$props.twoLine === void 0 && $$bindings.twoLine && twoLine !== void 0)
		$$bindings.twoLine(twoLine);
	if ($$props.threeLine === void 0 && $$bindings.threeLine && threeLine !== void 0)
		$$bindings.threeLine(threeLine);
	if ($$props.vertical === void 0 && $$bindings.vertical && vertical !== void 0)
		$$bindings.vertical(vertical);
	if ($$props.wrapFocus === void 0 && $$bindings.wrapFocus && wrapFocus !== void 0)
		$$bindings.wrapFocus(wrapFocus);
	if (
		$$props.singleSelection === void 0 &&
		$$bindings.singleSelection &&
		singleSelection !== void 0
	)
		$$bindings.singleSelection(singleSelection);
	if (
		$$props.disabledItemsFocusable === void 0 &&
		$$bindings.disabledItemsFocusable &&
		disabledItemsFocusable !== void 0
	)
		$$bindings.disabledItemsFocusable(disabledItemsFocusable);
	if ($$props.selectedIndex === void 0 && $$bindings.selectedIndex && selectedIndex !== void 0)
		$$bindings.selectedIndex(selectedIndex);
	if ($$props.radioList === void 0 && $$bindings.radioList && radioList !== void 0)
		$$bindings.radioList(radioList);
	if ($$props.checkList === void 0 && $$bindings.checkList && checkList !== void 0)
		$$bindings.checkList(checkList);
	if ($$props.hasTypeahead === void 0 && $$bindings.hasTypeahead && hasTypeahead !== void 0)
		$$bindings.hasTypeahead(hasTypeahead);
	if ($$props.component === void 0 && $$bindings.component && component !== void 0)
		$$bindings.component(component);
	if ($$props.tag === void 0 && $$bindings.tag && tag !== void 0) $$bindings.tag(tag);
	if ($$props.layout === void 0 && $$bindings.layout && layout !== void 0)
		$$bindings.layout(layout);
	if ($$props.setEnabled === void 0 && $$bindings.setEnabled && setEnabled !== void 0)
		$$bindings.setEnabled(setEnabled);
	if (
		$$props.getTypeaheadInProgress === void 0 &&
		$$bindings.getTypeaheadInProgress &&
		getTypeaheadInProgress !== void 0
	)
		$$bindings.getTypeaheadInProgress(getTypeaheadInProgress);
	if (
		$$props.getSelectedIndex === void 0 &&
		$$bindings.getSelectedIndex &&
		getSelectedIndex !== void 0
	)
		$$bindings.getSelectedIndex(getSelectedIndex);
	if (
		$$props.getFocusedItemIndex === void 0 &&
		$$bindings.getFocusedItemIndex &&
		getFocusedItemIndex !== void 0
	)
		$$bindings.getFocusedItemIndex(getFocusedItemIndex);
	if ($$props.getElement === void 0 && $$bindings.getElement && getElement !== void 0)
		$$bindings.getElement(getElement);
	let $$settled;
	let $$rendered;
	do {
		$$settled = true;
		$$rendered = `${validate_component(component || missing_component, 'svelte:component').$$render(
			$$result,
			Object.assign(
				{},
				{ tag },
				{ use: [forwardEvents, ...use] },
				{
					class: classMap({
						[className]: true,
						'mdc-deprecated-list': true,
						'mdc-deprecated-list--non-interactive': nonInteractive,
						'mdc-deprecated-list--dense': dense,
						'mdc-deprecated-list--textual-list': textualList,
						'mdc-deprecated-list--avatar-list': avatarList || selectionDialog,
						'mdc-deprecated-list--icon-list': iconList,
						'mdc-deprecated-list--image-list': imageList,
						'mdc-deprecated-list--thumbnail-list': thumbnailList,
						'mdc-deprecated-list--video-list': videoList,
						'mdc-deprecated-list--two-line': twoLine,
						'smui-list--three-line': threeLine && !twoLine
					})
				},
				{ role },
				$$restProps,
				{ this: element }
			),
			{
				this: ($$value) => {
					element = $$value;
					$$settled = false;
				}
			},
			{
				default: () => {
					return `${slots.default ? slots.default({}) : ``}`;
				}
			}
		)}`;
	} while (!$$settled);
	return $$rendered;
});
const { Object: Object_1 } = globals;
let counter = 0;
const Item = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let tabindex;
	let $$restProps = compute_rest_props($$props, [
		'use',
		'class',
		'style',
		'color',
		'nonInteractive',
		'ripple',
		'wrapper',
		'activated',
		'role',
		'selected',
		'disabled',
		'skipRestoreFocus',
		'tabindex',
		'inputId',
		'href',
		'component',
		'tag',
		'action',
		'getPrimaryText',
		'getElement'
	]);
	var _a;
	const forwardEvents = forwardEventsBuilder(get_current_component());
	let uninitializedValue = () => {};
	function isUninitializedValue(value) {
		return value === uninitializedValue;
	}
	let { use = [] } = $$props;
	let { class: className = '' } = $$props;
	let { style = '' } = $$props;
	let { color = void 0 } = $$props;
	let {
		nonInteractive = (_a = getContext('SMUI:list:nonInteractive')) !== null && _a !== void 0
			? _a
			: false
	} = $$props;
	setContext('SMUI:list:nonInteractive', void 0);
	let { ripple = !nonInteractive } = $$props;
	let { wrapper = false } = $$props;
	let { activated = false } = $$props;
	let { role = wrapper ? 'presentation' : getContext('SMUI:list:item:role') } = $$props;
	setContext('SMUI:list:item:role', void 0);
	let { selected = false } = $$props;
	let { disabled = false } = $$props;
	let { skipRestoreFocus = false } = $$props;
	let { tabindex: tabindexProp = uninitializedValue } = $$props;
	let { inputId = 'SMUI-form-field-list-' + counter++ } = $$props;
	let { href = void 0 } = $$props;
	let element;
	let internalClasses = {};
	let internalStyles = {};
	let internalAttrs = {};
	let input;
	let nav = getContext('SMUI:list:item:nav');
	let { component = SmuiElement } = $$props;
	let { tag = component === SmuiElement ? (nav ? (href ? 'a' : 'span') : 'li') : void 0 } = $$props;
	setContext('SMUI:generic:input:props', { id: inputId });
	setContext('SMUI:separator:context', void 0);
	onDestroy(() => {});
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
	function addStyle(name, value) {
		if (internalStyles[name] != value) {
			if (value === '' || value == null) {
				delete internalStyles[name];
				internalStyles = internalStyles;
			} else {
				internalStyles[name] = value;
			}
		}
	}
	function action(e) {
		if (!disabled) {
			dispatch(getElement(), 'SMUI:action', e);
		}
	}
	function getPrimaryText() {
		var _a2, _b, _c;
		const element2 = getElement();
		const primaryText = element2.querySelector('.mdc-deprecated-list-item__primary-text');
		if (primaryText) {
			return (_a2 = primaryText.textContent) !== null && _a2 !== void 0 ? _a2 : '';
		}
		const text = element2.querySelector('.mdc-deprecated-list-item__text');
		if (text) {
			return (_b = text.textContent) !== null && _b !== void 0 ? _b : '';
		}
		return (_c = element2.textContent) !== null && _c !== void 0 ? _c : '';
	}
	function getElement() {
		return element.getElement();
	}
	if ($$props.use === void 0 && $$bindings.use && use !== void 0) $$bindings.use(use);
	if ($$props.class === void 0 && $$bindings.class && className !== void 0)
		$$bindings.class(className);
	if ($$props.style === void 0 && $$bindings.style && style !== void 0) $$bindings.style(style);
	if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
	if ($$props.nonInteractive === void 0 && $$bindings.nonInteractive && nonInteractive !== void 0)
		$$bindings.nonInteractive(nonInteractive);
	if ($$props.ripple === void 0 && $$bindings.ripple && ripple !== void 0)
		$$bindings.ripple(ripple);
	if ($$props.wrapper === void 0 && $$bindings.wrapper && wrapper !== void 0)
		$$bindings.wrapper(wrapper);
	if ($$props.activated === void 0 && $$bindings.activated && activated !== void 0)
		$$bindings.activated(activated);
	if ($$props.role === void 0 && $$bindings.role && role !== void 0) $$bindings.role(role);
	if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0)
		$$bindings.selected(selected);
	if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
		$$bindings.disabled(disabled);
	if (
		$$props.skipRestoreFocus === void 0 &&
		$$bindings.skipRestoreFocus &&
		skipRestoreFocus !== void 0
	)
		$$bindings.skipRestoreFocus(skipRestoreFocus);
	if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindexProp !== void 0)
		$$bindings.tabindex(tabindexProp);
	if ($$props.inputId === void 0 && $$bindings.inputId && inputId !== void 0)
		$$bindings.inputId(inputId);
	if ($$props.href === void 0 && $$bindings.href && href !== void 0) $$bindings.href(href);
	if ($$props.component === void 0 && $$bindings.component && component !== void 0)
		$$bindings.component(component);
	if ($$props.tag === void 0 && $$bindings.tag && tag !== void 0) $$bindings.tag(tag);
	if ($$props.action === void 0 && $$bindings.action && action !== void 0)
		$$bindings.action(action);
	if ($$props.getPrimaryText === void 0 && $$bindings.getPrimaryText && getPrimaryText !== void 0)
		$$bindings.getPrimaryText(getPrimaryText);
	if ($$props.getElement === void 0 && $$bindings.getElement && getElement !== void 0)
		$$bindings.getElement(getElement);
	let $$settled;
	let $$rendered;
	do {
		$$settled = true;
		tabindex = isUninitializedValue(tabindexProp)
			? !nonInteractive && !disabled && (selected || input)
				? 0
				: -1
			: tabindexProp;
		$$rendered = `${validate_component(component || missing_component, 'svelte:component').$$render(
			$$result,
			Object_1.assign(
				{},
				{ tag },
				{
					use: [
						...(nonInteractive
							? []
							: [
									[
										Ripple,
										{
											ripple: !input,
											unbounded: false,
											color: (activated || selected) && color == null ? 'primary' : color,
											disabled,
											addClass,
											removeClass,
											addStyle
										}
									]
							  ]),
						forwardEvents,
						...use
					]
				},
				{
					class: classMap({
						[className]: true,
						'mdc-deprecated-list-item': !wrapper,
						'mdc-deprecated-list-item__wrapper': wrapper,
						'mdc-deprecated-list-item--activated': activated,
						'mdc-deprecated-list-item--selected': selected,
						'mdc-deprecated-list-item--disabled': disabled,
						'mdc-menu-item--selected': !nav && role === 'menuitem' && selected,
						'smui-menu-item--non-interactive': nonInteractive,
						...internalClasses
					})
				},
				{
					style: Object.entries(internalStyles)
						.map(([name, value]) => `${name}: ${value};`)
						.concat([style])
						.join(' ')
				},
				nav && activated ? { 'aria-current': 'page' } : {},
				!nav || wrapper ? { role } : {},
				!nav && role === 'option'
					? {
							'aria-selected': selected ? 'true' : 'false'
					  }
					: {},
				!nav && (role === 'radio' || role === 'checkbox')
					? {
							'aria-checked': 'false'
					  }
					: {},
				!nav
					? {
							'aria-disabled': disabled ? 'true' : 'false'
					  }
					: {},
				{
					'data-menu-item-skip-restore-focus': skipRestoreFocus || void 0
				},
				{ tabindex },
				{ href },
				internalAttrs,
				$$restProps,
				{ this: element }
			),
			{
				this: ($$value) => {
					element = $$value;
					$$settled = false;
				}
			},
			{
				default: () => {
					return `${ripple ? `<span class="mdc-deprecated-list-item__ripple"></span>` : ``}${
						slots.default ? slots.default({}) : ``
					}`;
				}
			}
		)}`;
	} while (!$$settled);
	return $$rendered;
});
classAdderBuilder({
	class: 'mdc-deprecated-list-item__text',
	tag: 'span'
});
classAdderBuilder({
	class: 'mdc-deprecated-list-item__primary-text',
	tag: 'span'
});
classAdderBuilder({
	class: 'mdc-deprecated-list-item__secondary-text',
	tag: 'span'
});
classAdderBuilder({
	class: 'mdc-deprecated-list-item__meta',
	tag: 'span'
});
classAdderBuilder({
	class: 'mdc-deprecated-list-group',
	tag: 'div'
});
classAdderBuilder({
	class: 'mdc-deprecated-list-group__subheader',
	tag: 'h3'
});
export { Item as I, List as L, dispatch as d };
