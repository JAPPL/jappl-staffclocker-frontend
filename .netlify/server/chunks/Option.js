import {
	c as create_ssr_component,
	b as compute_rest_props,
	d as get_current_component,
	g as getContext,
	f as spread,
	h as escape_attribute_value,
	i as escape_object,
	j as add_attribute,
	s as setContext,
	o as onDestroy,
	v as validate_component,
	a as subscribe,
	k as set_store_value,
	e as escape,
	r as globals,
	t as compute_slots
} from './index3.js';
import { w as writable } from './index2.js';
import {
	f as forwardEventsBuilder,
	c as classMap,
	a as classAdderBuilder,
	e as exclude,
	p as prefixFilter
} from './Ripple.js';
import { L as List, I as Item } from './Subheader.js';
import { F as FloatingLabel, N as NotchedOutline, L as LineRipple } from './NotchedOutline.js';
const Graphic = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $$restProps = compute_rest_props($$props, ['use', 'class', 'getElement']);
	forwardEventsBuilder(get_current_component());
	let { use = [] } = $$props;
	let { class: className = '' } = $$props;
	let element;
	let menuSelectionGroup = getContext('SMUI:list:graphic:menu-selection-group');
	function getElement() {
		return element;
	}
	if ($$props.use === void 0 && $$bindings.use && use !== void 0) $$bindings.use(use);
	if ($$props.class === void 0 && $$bindings.class && className !== void 0)
		$$bindings.class(className);
	if ($$props.getElement === void 0 && $$bindings.getElement && getElement !== void 0)
		$$bindings.getElement(getElement);
	return `<span${spread(
		[
			{
				class: escape_attribute_value(
					classMap({
						[className]: true,
						'mdc-deprecated-list-item__graphic': true,
						'mdc-menu__selection-group-icon': menuSelectionGroup
					})
				)
			},
			escape_object($$restProps)
		],
		{}
	)}${add_attribute('this', element, 0)}>${slots.default ? slots.default({}) : ``}</span>`;
});
const MenuSurface = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $$restProps = compute_rest_props($$props, [
		'use',
		'class',
		'style',
		'static',
		'anchor',
		'fixed',
		'open',
		'managed',
		'fullWidth',
		'quickOpen',
		'anchorElement',
		'anchorCorner',
		'anchorMargin',
		'maxHeight',
		'horizontallyCenteredOnViewport',
		'openBottomBias',
		'isOpen',
		'setOpen',
		'setAbsolutePosition',
		'setIsHoisted',
		'isFixed',
		'getElement'
	]);
	forwardEventsBuilder(get_current_component());
	let { use = [] } = $$props;
	let { class: className = '' } = $$props;
	let { style = '' } = $$props;
	let { static: isStatic = false } = $$props;
	let { anchor = true } = $$props;
	let { fixed = false } = $$props;
	let { open = isStatic } = $$props;
	let { managed = false } = $$props;
	let { fullWidth = false } = $$props;
	let { quickOpen = false } = $$props;
	let { anchorElement = void 0 } = $$props;
	let { anchorCorner = void 0 } = $$props;
	let { anchorMargin = { top: 0, right: 0, bottom: 0, left: 0 } } = $$props;
	let { maxHeight = 0 } = $$props;
	let { horizontallyCenteredOnViewport = false } = $$props;
	let { openBottomBias = 0 } = $$props;
	let element;
	let instance;
	let internalClasses = {};
	let internalStyles = {};
	setContext('SMUI:list:role', 'menu');
	setContext('SMUI:list:item:role', 'menuitem');
	onDestroy(() => {});
	function isOpen() {
		return open;
	}
	function setOpen(value) {
		open = value;
	}
	function setAbsolutePosition(x, y) {
		return instance.setAbsolutePosition(x, y);
	}
	function setIsHoisted(isHoisted) {
		return instance.setIsHoisted(isHoisted);
	}
	function isFixed() {
		return instance.isFixed();
	}
	function getElement() {
		return element;
	}
	if ($$props.use === void 0 && $$bindings.use && use !== void 0) $$bindings.use(use);
	if ($$props.class === void 0 && $$bindings.class && className !== void 0)
		$$bindings.class(className);
	if ($$props.style === void 0 && $$bindings.style && style !== void 0) $$bindings.style(style);
	if ($$props.static === void 0 && $$bindings.static && isStatic !== void 0)
		$$bindings.static(isStatic);
	if ($$props.anchor === void 0 && $$bindings.anchor && anchor !== void 0)
		$$bindings.anchor(anchor);
	if ($$props.fixed === void 0 && $$bindings.fixed && fixed !== void 0) $$bindings.fixed(fixed);
	if ($$props.open === void 0 && $$bindings.open && open !== void 0) $$bindings.open(open);
	if ($$props.managed === void 0 && $$bindings.managed && managed !== void 0)
		$$bindings.managed(managed);
	if ($$props.fullWidth === void 0 && $$bindings.fullWidth && fullWidth !== void 0)
		$$bindings.fullWidth(fullWidth);
	if ($$props.quickOpen === void 0 && $$bindings.quickOpen && quickOpen !== void 0)
		$$bindings.quickOpen(quickOpen);
	if ($$props.anchorElement === void 0 && $$bindings.anchorElement && anchorElement !== void 0)
		$$bindings.anchorElement(anchorElement);
	if ($$props.anchorCorner === void 0 && $$bindings.anchorCorner && anchorCorner !== void 0)
		$$bindings.anchorCorner(anchorCorner);
	if ($$props.anchorMargin === void 0 && $$bindings.anchorMargin && anchorMargin !== void 0)
		$$bindings.anchorMargin(anchorMargin);
	if ($$props.maxHeight === void 0 && $$bindings.maxHeight && maxHeight !== void 0)
		$$bindings.maxHeight(maxHeight);
	if (
		$$props.horizontallyCenteredOnViewport === void 0 &&
		$$bindings.horizontallyCenteredOnViewport &&
		horizontallyCenteredOnViewport !== void 0
	)
		$$bindings.horizontallyCenteredOnViewport(horizontallyCenteredOnViewport);
	if ($$props.openBottomBias === void 0 && $$bindings.openBottomBias && openBottomBias !== void 0)
		$$bindings.openBottomBias(openBottomBias);
	if ($$props.isOpen === void 0 && $$bindings.isOpen && isOpen !== void 0)
		$$bindings.isOpen(isOpen);
	if ($$props.setOpen === void 0 && $$bindings.setOpen && setOpen !== void 0)
		$$bindings.setOpen(setOpen);
	if (
		$$props.setAbsolutePosition === void 0 &&
		$$bindings.setAbsolutePosition &&
		setAbsolutePosition !== void 0
	)
		$$bindings.setAbsolutePosition(setAbsolutePosition);
	if ($$props.setIsHoisted === void 0 && $$bindings.setIsHoisted && setIsHoisted !== void 0)
		$$bindings.setIsHoisted(setIsHoisted);
	if ($$props.isFixed === void 0 && $$bindings.isFixed && isFixed !== void 0)
		$$bindings.isFixed(isFixed);
	if ($$props.getElement === void 0 && $$bindings.getElement && getElement !== void 0)
		$$bindings.getElement(getElement);
	return `

<div${spread(
		[
			{
				class: escape_attribute_value(
					classMap({
						[className]: true,
						'mdc-menu-surface': true,
						'mdc-menu-surface--fixed': fixed,
						'mdc-menu-surface--open': isStatic,
						'smui-menu-surface--static': isStatic,
						'mdc-menu-surface--fullwidth': fullWidth,
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
			escape_object($$restProps)
		],
		{}
	)}${add_attribute('this', element, 0)}>${slots.default ? slots.default({}) : ``}
</div>`;
});
const Menu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let usePass;
	let $$restProps = compute_rest_props($$props, [
		'use',
		'class',
		'open',
		'isOpen',
		'setOpen',
		'setDefaultFocusState',
		'getSelectedIndex',
		'getMenuSurface',
		'getElement'
	]);
	const forwardEvents = forwardEventsBuilder(get_current_component());
	let { use = [] } = $$props;
	let { class: className = '' } = $$props;
	let { open = false } = $$props;
	let element;
	let instance;
	function isOpen() {
		return open;
	}
	function setOpen(value) {
		open = value;
	}
	function setDefaultFocusState(focusState) {
		instance.setDefaultFocusState(focusState);
	}
	function getSelectedIndex() {
		return instance.getSelectedIndex();
	}
	function getMenuSurface() {
		return element;
	}
	function getElement() {
		return element.getElement();
	}
	if ($$props.use === void 0 && $$bindings.use && use !== void 0) $$bindings.use(use);
	if ($$props.class === void 0 && $$bindings.class && className !== void 0)
		$$bindings.class(className);
	if ($$props.open === void 0 && $$bindings.open && open !== void 0) $$bindings.open(open);
	if ($$props.isOpen === void 0 && $$bindings.isOpen && isOpen !== void 0)
		$$bindings.isOpen(isOpen);
	if ($$props.setOpen === void 0 && $$bindings.setOpen && setOpen !== void 0)
		$$bindings.setOpen(setOpen);
	if (
		$$props.setDefaultFocusState === void 0 &&
		$$bindings.setDefaultFocusState &&
		setDefaultFocusState !== void 0
	)
		$$bindings.setDefaultFocusState(setDefaultFocusState);
	if (
		$$props.getSelectedIndex === void 0 &&
		$$bindings.getSelectedIndex &&
		getSelectedIndex !== void 0
	)
		$$bindings.getSelectedIndex(getSelectedIndex);
	if ($$props.getMenuSurface === void 0 && $$bindings.getMenuSurface && getMenuSurface !== void 0)
		$$bindings.getMenuSurface(getMenuSurface);
	if ($$props.getElement === void 0 && $$bindings.getElement && getElement !== void 0)
		$$bindings.getElement(getElement);
	let $$settled;
	let $$rendered;
	do {
		$$settled = true;
		usePass = [forwardEvents, ...use];
		$$rendered = `${validate_component(MenuSurface, 'MenuSurface').$$render(
			$$result,
			Object.assign(
				{},
				{ use: usePass },
				{
					class: classMap({ [className]: true, 'mdc-menu': true })
				},
				$$restProps,
				{ this: element },
				{ open }
			),
			{
				this: ($$value) => {
					element = $$value;
					$$settled = false;
				},
				open: ($$value) => {
					open = $$value;
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
classAdderBuilder({
	class: 'mdc-menu__selection-group-icon',
	component: Graphic
});
let counter$1 = 0;
const HelperText = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $$restProps = compute_rest_props($$props, [
		'use',
		'class',
		'id',
		'persistent',
		'validationMsg',
		'getElement'
	]);
	forwardEventsBuilder(get_current_component());
	let { use = [] } = $$props;
	let { class: className = '' } = $$props;
	let { id = 'SMUI-select-helper-text-' + counter$1++ } = $$props;
	let { persistent = false } = $$props;
	let { validationMsg = false } = $$props;
	let element;
	let internalClasses = {};
	let internalAttrs = {};
	function getElement() {
		return element;
	}
	if ($$props.use === void 0 && $$bindings.use && use !== void 0) $$bindings.use(use);
	if ($$props.class === void 0 && $$bindings.class && className !== void 0)
		$$bindings.class(className);
	if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
	if ($$props.persistent === void 0 && $$bindings.persistent && persistent !== void 0)
		$$bindings.persistent(persistent);
	if ($$props.validationMsg === void 0 && $$bindings.validationMsg && validationMsg !== void 0)
		$$bindings.validationMsg(validationMsg);
	if ($$props.getElement === void 0 && $$bindings.getElement && getElement !== void 0)
		$$bindings.getElement(getElement);
	return `<div${spread(
		[
			{
				class: escape_attribute_value(
					classMap({
						[className]: true,
						'mdc-select-helper-text': true,
						'mdc-select-helper-text--validation-msg': validationMsg,
						'mdc-select-helper-text--validation-msg-persistent': persistent,
						...internalClasses
					})
				)
			},
			{
				'aria-hidden': escape_attribute_value(persistent ? void 0 : 'true')
			},
			{ id: escape_attribute_value(id) },
			escape_object(internalAttrs),
			escape_object($$restProps)
		],
		{}
	)}${add_attribute('this', element, 0)}>${`${slots.default ? slots.default({}) : ``}`}
</div>`;
});
const { Object: Object_1 } = globals;
let counter = 0;
const Select = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $$restProps = compute_rest_props($$props, [
		'use',
		'class',
		'style',
		'ripple',
		'disabled',
		'variant',
		'noLabel',
		'label',
		'value',
		'key',
		'dirty',
		'invalid',
		'updateInvalid',
		'required',
		'inputId',
		'hiddenInput',
		'withLeadingIcon',
		'anchor$use',
		'anchor$class',
		'selectedTextContainer$use',
		'selectedTextContainer$class',
		'selectedText$use',
		'selectedText$class',
		'dropdownIcon$use',
		'dropdownIcon$class',
		'menu$class',
		'getUseDefaultValidation',
		'setUseDefaultValidation',
		'focus',
		'layout',
		'getElement'
	]);
	let $$slots = compute_slots(slots);
	let $selectedTextStore, $$unsubscribe_selectedTextStore;
	let $valueStore, $$unsubscribe_valueStore;
	forwardEventsBuilder(get_current_component());
	let uninitializedValue = () => {};
	function isUninitializedValue(value2) {
		return value2 === uninitializedValue;
	}
	let { use = [] } = $$props;
	let { class: className = '' } = $$props;
	let { style = '' } = $$props;
	let { ripple = true } = $$props;
	let { disabled = false } = $$props;
	let { variant = 'standard' } = $$props;
	let { noLabel = false } = $$props;
	let { label = void 0 } = $$props;
	let { value = '' } = $$props;
	let { key = (item) => item } = $$props;
	let { dirty = false } = $$props;
	let { invalid = uninitializedValue } = $$props;
	let { updateInvalid = isUninitializedValue(invalid) } = $$props;
	if (isUninitializedValue(invalid)) {
		invalid = false;
	}
	let { required = false } = $$props;
	let { inputId = 'SMUI-select-' + counter++ } = $$props;
	let { hiddenInput = false } = $$props;
	let { withLeadingIcon = uninitializedValue } = $$props;
	let { anchor$use = [] } = $$props;
	let { anchor$class = '' } = $$props;
	let { selectedTextContainer$use = [] } = $$props;
	let { selectedTextContainer$class = '' } = $$props;
	let { selectedText$use = [] } = $$props;
	let { selectedText$class = '' } = $$props;
	let { dropdownIcon$use = [] } = $$props;
	let { dropdownIcon$class = '' } = $$props;
	let { menu$class = '' } = $$props;
	let element;
	let instance;
	let internalClasses = {};
	let internalStyles = {};
	let selectAnchor;
	let selectAnchorAttrs = {};
	let selectedIndex = -1;
	let helperId = void 0;
	let addLayoutListener = getContext('SMUI:addLayoutListener');
	let removeLayoutListener;
	let menuOpen = false;
	let menuClasses = {};
	let anchorElement = void 0;
	let anchorCorner = void 0;
	let wrapFocus = false;
	let list;
	let context = getContext('SMUI:select:context');
	let floatingLabel = void 0;
	let lineRipple = void 0;
	let notchedOutline = void 0;
	setContext('SMUI:list:role', '');
	setContext('SMUI:list:nav', false);
	const selectedTextStore = writable('');
	$$unsubscribe_selectedTextStore = subscribe(
		selectedTextStore,
		(value2) => ($selectedTextStore = value2)
	);
	setContext('SMUI:select:selectedText', selectedTextStore);
	const valueStore = writable(value);
	$$unsubscribe_valueStore = subscribe(valueStore, (value2) => ($valueStore = value2));
	setContext('SMUI:select:value', valueStore);
	let previousSelectedIndex = selectedIndex;
	if (addLayoutListener) {
		removeLayoutListener = addLayoutListener(layout);
	}
	onDestroy(() => {
		if (removeLayoutListener) {
			removeLayoutListener();
		}
	});
	function getMenuItemValues() {
		return list.getOrderedList().map((accessor) => accessor.getValue());
	}
	function getUseDefaultValidation() {
		return instance.getUseDefaultValidation();
	}
	function setUseDefaultValidation(useDefaultValidation) {
		instance.setUseDefaultValidation(useDefaultValidation);
	}
	function focus() {
		selectAnchor.focus();
	}
	function layout() {
		instance.layout();
	}
	function getElement() {
		return element;
	}
	if ($$props.use === void 0 && $$bindings.use && use !== void 0) $$bindings.use(use);
	if ($$props.class === void 0 && $$bindings.class && className !== void 0)
		$$bindings.class(className);
	if ($$props.style === void 0 && $$bindings.style && style !== void 0) $$bindings.style(style);
	if ($$props.ripple === void 0 && $$bindings.ripple && ripple !== void 0)
		$$bindings.ripple(ripple);
	if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
		$$bindings.disabled(disabled);
	if ($$props.variant === void 0 && $$bindings.variant && variant !== void 0)
		$$bindings.variant(variant);
	if ($$props.noLabel === void 0 && $$bindings.noLabel && noLabel !== void 0)
		$$bindings.noLabel(noLabel);
	if ($$props.label === void 0 && $$bindings.label && label !== void 0) $$bindings.label(label);
	if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
	if ($$props.key === void 0 && $$bindings.key && key !== void 0) $$bindings.key(key);
	if ($$props.dirty === void 0 && $$bindings.dirty && dirty !== void 0) $$bindings.dirty(dirty);
	if ($$props.invalid === void 0 && $$bindings.invalid && invalid !== void 0)
		$$bindings.invalid(invalid);
	if ($$props.updateInvalid === void 0 && $$bindings.updateInvalid && updateInvalid !== void 0)
		$$bindings.updateInvalid(updateInvalid);
	if ($$props.required === void 0 && $$bindings.required && required !== void 0)
		$$bindings.required(required);
	if ($$props.inputId === void 0 && $$bindings.inputId && inputId !== void 0)
		$$bindings.inputId(inputId);
	if ($$props.hiddenInput === void 0 && $$bindings.hiddenInput && hiddenInput !== void 0)
		$$bindings.hiddenInput(hiddenInput);
	if (
		$$props.withLeadingIcon === void 0 &&
		$$bindings.withLeadingIcon &&
		withLeadingIcon !== void 0
	)
		$$bindings.withLeadingIcon(withLeadingIcon);
	if ($$props.anchor$use === void 0 && $$bindings.anchor$use && anchor$use !== void 0)
		$$bindings.anchor$use(anchor$use);
	if ($$props.anchor$class === void 0 && $$bindings.anchor$class && anchor$class !== void 0)
		$$bindings.anchor$class(anchor$class);
	if (
		$$props.selectedTextContainer$use === void 0 &&
		$$bindings.selectedTextContainer$use &&
		selectedTextContainer$use !== void 0
	)
		$$bindings.selectedTextContainer$use(selectedTextContainer$use);
	if (
		$$props.selectedTextContainer$class === void 0 &&
		$$bindings.selectedTextContainer$class &&
		selectedTextContainer$class !== void 0
	)
		$$bindings.selectedTextContainer$class(selectedTextContainer$class);
	if (
		$$props.selectedText$use === void 0 &&
		$$bindings.selectedText$use &&
		selectedText$use !== void 0
	)
		$$bindings.selectedText$use(selectedText$use);
	if (
		$$props.selectedText$class === void 0 &&
		$$bindings.selectedText$class &&
		selectedText$class !== void 0
	)
		$$bindings.selectedText$class(selectedText$class);
	if (
		$$props.dropdownIcon$use === void 0 &&
		$$bindings.dropdownIcon$use &&
		dropdownIcon$use !== void 0
	)
		$$bindings.dropdownIcon$use(dropdownIcon$use);
	if (
		$$props.dropdownIcon$class === void 0 &&
		$$bindings.dropdownIcon$class &&
		dropdownIcon$class !== void 0
	)
		$$bindings.dropdownIcon$class(dropdownIcon$class);
	if ($$props.menu$class === void 0 && $$bindings.menu$class && menu$class !== void 0)
		$$bindings.menu$class(menu$class);
	if (
		$$props.getUseDefaultValidation === void 0 &&
		$$bindings.getUseDefaultValidation &&
		getUseDefaultValidation !== void 0
	)
		$$bindings.getUseDefaultValidation(getUseDefaultValidation);
	if (
		$$props.setUseDefaultValidation === void 0 &&
		$$bindings.setUseDefaultValidation &&
		setUseDefaultValidation !== void 0
	)
		$$bindings.setUseDefaultValidation(setUseDefaultValidation);
	if ($$props.focus === void 0 && $$bindings.focus && focus !== void 0) $$bindings.focus(focus);
	if ($$props.layout === void 0 && $$bindings.layout && layout !== void 0)
		$$bindings.layout(layout);
	if ($$props.getElement === void 0 && $$bindings.getElement && getElement !== void 0)
		$$bindings.getElement(getElement);
	let $$settled;
	let $$rendered;
	do {
		$$settled = true;
		{
			if (previousSelectedIndex !== selectedIndex) {
				previousSelectedIndex = selectedIndex;
				{
					const values = getMenuItemValues();
					if (value !== values[selectedIndex]) {
						value = values[selectedIndex];
					}
				}
			}
		}
		set_store_value(valueStore, ($valueStore = value), $valueStore);
		$$rendered = `<div${spread(
			[
				{
					class: escape_attribute_value(
						classMap({
							[className]: true,
							'mdc-select': true,
							'mdc-select--required': required,
							'mdc-select--disabled': disabled,
							'mdc-select--filled': variant === 'filled',
							'mdc-select--outlined': variant === 'outlined',
							'smui-select--standard': variant === 'standard',
							'mdc-select--with-leading-icon': isUninitializedValue(withLeadingIcon)
								? $$slots.leadingIcon
								: withLeadingIcon,
							'mdc-select--no-label': noLabel || (label == null && !$$slots.label),
							'mdc-select--invalid': invalid,
							'mdc-select--activated': menuOpen,
							'mdc-data-table__pagination-rows-per-page-select':
								context === 'data-table:pagination',
							...internalClasses
						})
					)
				},
				{
					style: escape_attribute_value(
						Object.entries(internalStyles)
							.map(([name, value2]) => `${name}: ${value2};`)
							.concat([style])
							.join(' ')
					)
				},
				escape_object(
					exclude($$restProps, [
						'input$',
						'anchor$',
						'label$',
						'outline$',
						'selectedTextContainer$',
						'selectedText$',
						'dropdownIcon$',
						'ripple$',
						'menu$',
						'list$',
						'helperText$'
					])
				)
			],
			{}
		)}${add_attribute('this', element, 0)}>${
			hiddenInput
				? `<input${spread(
						[
							{ type: 'hidden' },
							{ required: required || null },
							{ disabled: disabled || null },
							{ value: escape_attribute_value(value) },
							escape_object(prefixFilter($$restProps, 'input$'))
						],
						{}
				  )}>`
				: ``
		}
  <div${spread(
		[
			{
				class: escape_attribute_value(
					classMap({
						[anchor$class]: true,
						'mdc-select__anchor': true
					})
				)
			},
			{
				'aria-required': escape_attribute_value(required ? 'true' : void 0)
			},
			{
				'aria-disabled': escape_attribute_value(disabled ? 'true' : void 0)
			},
			{
				'aria-controls': escape_attribute_value(helperId)
			},
			{
				'aria-describedby': escape_attribute_value(helperId)
			},
			escape_object(selectAnchorAttrs),
			escape_object(prefixFilter($$restProps, 'anchor$'))
		],
		{}
	)}${add_attribute('this', selectAnchor, 0)}>${
			variant === 'filled' ? `<span class="mdc-select__ripple"></span>` : ``
		}
    ${
			variant !== 'outlined' && !noLabel && (label != null || $$slots.label)
				? `${validate_component(FloatingLabel, 'FloatingLabel').$$render(
						$$result,
						Object_1.assign(
							{},
							{ id: inputId + '-smui-label' },
							{ floatAbove: $selectedTextStore !== '' },
							{ required },
							prefixFilter($$restProps, 'label$'),
							{ this: floatingLabel }
						),
						{
							this: ($$value) => {
								floatingLabel = $$value;
								$$settled = false;
							}
						},
						{
							default: () => {
								return `${escape(label == null ? '' : label)}${slots.label ? slots.label({}) : ``}`;
							}
						}
				  )}`
				: ``
		}
    ${
			variant === 'outlined'
				? `${validate_component(NotchedOutline, 'NotchedOutline').$$render(
						$$result,
						Object_1.assign(
							{},
							{
								noLabel: noLabel || (label == null && !$$slots.label)
							},
							prefixFilter($$restProps, 'outline$'),
							{ this: notchedOutline }
						),
						{
							this: ($$value) => {
								notchedOutline = $$value;
								$$settled = false;
							}
						},
						{
							default: () => {
								return `${
									!noLabel && (label != null || $$slots.label)
										? `${validate_component(FloatingLabel, 'FloatingLabel').$$render(
												$$result,
												Object_1.assign(
													{},
													{ id: inputId + '-smui-label' },
													{ floatAbove: $selectedTextStore !== '' },
													{ required },
													prefixFilter($$restProps, 'label$'),
													{ this: floatingLabel }
												),
												{
													this: ($$value) => {
														floatingLabel = $$value;
														$$settled = false;
													}
												},
												{
													default: () => {
														return `${escape(label == null ? '' : label)}${
															slots.label ? slots.label({}) : ``
														}`;
													}
												}
										  )}`
										: ``
								}`;
							}
						}
				  )}`
				: ``
		}
    ${slots.leadingIcon ? slots.leadingIcon({}) : ``}
    <span${spread(
			[
				{
					class: escape_attribute_value(
						classMap({
							[selectedTextContainer$class]: true,
							'mdc-select__selected-text-container': true
						})
					)
				},
				escape_object(prefixFilter($$restProps, 'selectedTextContainer$'))
			],
			{}
		)}><span${spread(
			[
				{
					id: escape_attribute_value(inputId + '-smui-selected-text')
				},
				{
					class: escape_attribute_value(
						classMap({
							[selectedText$class]: true,
							'mdc-select__selected-text': true
						})
					)
				},
				{ role: 'button' },
				{ 'aria-haspopup': 'listbox' },
				{
					'aria-labelledby': escape_attribute_value(inputId + '-smui-label')
				},
				escape_object(prefixFilter($$restProps, 'selectedText$'))
			],
			{}
		)}>${escape($selectedTextStore)}</span></span>
    <span${spread(
			[
				{
					class: escape_attribute_value(
						classMap({
							[dropdownIcon$class]: true,
							'mdc-select__dropdown-icon': true
						})
					)
				},
				escape_object(prefixFilter($$restProps, 'dropdownIcon$'))
			],
			{}
		)}><svg class="mdc-select__dropdown-icon-graphic" viewBox="7 10 10 5" focusable="false"><polygon class="mdc-select__dropdown-icon-inactive" stroke="none" fill-rule="evenodd" points="7 10 12 15 17 10"></polygon><polygon class="mdc-select__dropdown-icon-active" stroke="none" fill-rule="evenodd" points="7 15 12 10 17 15"></polygon></svg></span>
    ${
			variant !== 'outlined' && ripple
				? `${validate_component(LineRipple, 'LineRipple').$$render(
						$$result,
						Object_1.assign({}, prefixFilter($$restProps, 'ripple$'), { this: lineRipple }),
						{
							this: ($$value) => {
								lineRipple = $$value;
								$$settled = false;
							}
						},
						{}
				  )}`
				: ``
		}</div>

  ${validate_component(Menu, 'Menu').$$render(
		$$result,
		Object_1.assign(
			{},
			{
				class: classMap({
					[menu$class]: true,
					'mdc-select__menu': true,
					...menuClasses
				})
			},
			{ fullWidth: true },
			{ anchor: false },
			{ anchorElement },
			{ anchorCorner },
			prefixFilter($$restProps, 'menu$'),
			{ open: menuOpen }
		),
		{
			open: ($$value) => {
				menuOpen = $$value;
				$$settled = false;
			}
		},
		{
			default: () => {
				return `${validate_component(List, 'List').$$render(
					$$result,
					Object_1.assign(
						{},
						{ role: 'listbox' },
						{ wrapFocus },
						prefixFilter($$restProps, 'list$'),
						{ selectedIndex }
					),
					{
						selectedIndex: ($$value) => {
							selectedIndex = $$value;
							$$settled = false;
						}
					},
					{
						default: () => {
							return `${slots.default ? slots.default({}) : ``}`;
						}
					}
				)}`;
			}
		}
	)}</div>
${
	$$slots.helperText
		? `${validate_component(HelperText, 'HelperText').$$render(
				$$result,
				Object_1.assign({}, prefixFilter($$restProps, 'helperText$')),
				{},
				{
					default: () => {
						return `${slots.helperText ? slots.helperText({}) : ``}`;
					}
				}
		  )}`
		: ``
}`;
	} while (!$$settled);
	$$unsubscribe_selectedTextStore();
	$$unsubscribe_valueStore();
	return $$rendered;
});
const Option = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let usePass;
	let selected;
	let $$restProps = compute_rest_props($$props, ['use', 'class', 'value', 'getElement']);
	let $selectedText, $$unsubscribe_selectedText;
	let $selectedValue, $$unsubscribe_selectedValue;
	const forwardEvents = forwardEventsBuilder(get_current_component());
	let { use = [] } = $$props;
	const className = '';
	let { value = '' } = $$props;
	let element;
	const selectedText = getContext('SMUI:select:selectedText');
	$$unsubscribe_selectedText = subscribe(selectedText, (value2) => ($selectedText = value2));
	const selectedValue = getContext('SMUI:select:value');
	$$unsubscribe_selectedValue = subscribe(selectedValue, (value2) => ($selectedValue = value2));
	setContext('SMUI:list:item:role', 'option');
	onDestroy(setSelectedText);
	function setSelectedText() {
		if (selected && element) {
			set_store_value(selectedText, ($selectedText = element.getPrimaryText()), $selectedText);
		}
	}
	function getElement() {
		return element.getElement();
	}
	if ($$props.use === void 0 && $$bindings.use && use !== void 0) $$bindings.use(use);
	if ($$props.class === void 0 && $$bindings.class && className !== void 0)
		$$bindings.class(className);
	if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
	if ($$props.getElement === void 0 && $$bindings.getElement && getElement !== void 0)
		$$bindings.getElement(getElement);
	let $$settled;
	let $$rendered;
	do {
		$$settled = true;
		usePass = [forwardEvents, ...use];
		selected = value != null && value !== '' && $selectedValue === value;
		$$rendered = `${validate_component(Item, 'Item').$$render(
			$$result,
			Object.assign(
				{},
				{ use: usePass },
				{ 'data-value': value },
				{ value },
				{ selected },
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
	$$unsubscribe_selectedText();
	$$unsubscribe_selectedValue();
	return $$rendered;
});
export { Option as O, Select as S };
