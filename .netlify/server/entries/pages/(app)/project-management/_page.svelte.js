import {
	c as create_ssr_component,
	a as subscribe,
	s as setContext,
	o as onDestroy,
	k as set_store_value,
	b as compute_rest_props,
	d as get_current_component,
	f as spread,
	h as escape_attribute_value,
	i as escape_object,
	j as add_attribute,
	g as getContext,
	v as validate_component,
	e as escape,
	r as globals,
	t as compute_slots,
	q as createEventDispatcher,
	l as each,
	u as noop
} from '../../../../chunks/index3.js';
import {
	F as FloatingLabel,
	N as NotchedOutline,
	L as LineRipple,
	C as Card,
	D as DataTable,
	H as Head,
	R as Row,
	a as Cell,
	B as Body
} from '../../../../chunks/NotchedOutline.js';
import { I as Index } from '../../../../chunks/Index4.js';
import { D as Dialog, T as Title, C as Content, A as Actions } from '../../../../chunks/Actions.js';
import { L as LinearProgress } from '../../../../chunks/LinearProgress.js';
import {
	a as classAdderBuilder,
	f as forwardEventsBuilder,
	c as classMap,
	e as exclude,
	p as prefixFilter
} from '../../../../chunks/Ripple.js';
import { w as writable } from '../../../../chunks/index2.js';
import { B as Button } from '../../../../chunks/Button.js';
import { u as userStore, C as CommonLabel } from '../../../../chunks/user.js';
import { field, form } from 'svelte-forms';
import { required } from 'svelte-forms/validators';
import '../../../../chunks/Toaster.svelte_svelte_type_style_lang.js';
import { mdiFolderPlus, mdiFolderEdit, mdiDeleteEmpty } from '@mdi/js';
const ContextFragment = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $storeValue, $$unsubscribe_storeValue;
	let { key } = $$props;
	let { value } = $$props;
	const storeValue = writable(value);
	$$unsubscribe_storeValue = subscribe(storeValue, (value2) => ($storeValue = value2));
	setContext(key, storeValue);
	onDestroy(() => {
		storeValue.set(void 0);
	});
	if ($$props.key === void 0 && $$bindings.key && key !== void 0) $$bindings.key(key);
	if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
	set_store_value(storeValue, ($storeValue = value), $storeValue);
	$$unsubscribe_storeValue();
	return `${slots.default ? slots.default({}) : ``}`;
});
const HelperLine = classAdderBuilder({
	class: 'mdc-text-field-helper-line',
	tag: 'div'
});
const Prefix = classAdderBuilder({
	class: 'mdc-text-field__affix mdc-text-field__affix--prefix',
	tag: 'span'
});
const Suffix = classAdderBuilder({
	class: 'mdc-text-field__affix mdc-text-field__affix--suffix',
	tag: 'span'
});
const Input = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $$restProps = compute_rest_props($$props, [
		'use',
		'class',
		'type',
		'placeholder',
		'value',
		'files',
		'dirty',
		'invalid',
		'updateInvalid',
		'emptyValueNull',
		'emptyValueUndefined',
		'getAttr',
		'addAttr',
		'removeAttr',
		'focus',
		'blur',
		'getElement'
	]);
	forwardEventsBuilder(get_current_component());
	let uninitializedValue = () => {};
	function isUninitializedValue(value2) {
		return value2 === uninitializedValue;
	}
	let { use = [] } = $$props;
	let { class: className = '' } = $$props;
	let { type = 'text' } = $$props;
	let { placeholder = ' ' } = $$props;
	let { value = uninitializedValue } = $$props;
	const valueUninitialized = isUninitializedValue(value);
	if (valueUninitialized) {
		value = '';
	}
	let { files = null } = $$props;
	let { dirty = false } = $$props;
	let { invalid = false } = $$props;
	let { updateInvalid = true } = $$props;
	let { emptyValueNull = value === null } = $$props;
	if (valueUninitialized && emptyValueNull) {
		value = null;
	}
	let { emptyValueUndefined = value === void 0 } = $$props;
	if (valueUninitialized && emptyValueUndefined) {
		value = void 0;
	}
	let element;
	let internalAttrs = {};
	let valueProp = {};
	function getAttr(name) {
		var _a;
		return name in internalAttrs
			? (_a = internalAttrs[name]) !== null && _a !== void 0
				? _a
				: null
			: getElement().getAttribute(name);
	}
	function addAttr(name, value2) {
		if (internalAttrs[name] !== value2) {
			internalAttrs[name] = value2;
		}
	}
	function removeAttr(name) {
		if (!(name in internalAttrs) || internalAttrs[name] != null) {
			internalAttrs[name] = void 0;
		}
	}
	function focus() {
		getElement().focus();
	}
	function blur() {
		getElement().blur();
	}
	function getElement() {
		return element;
	}
	if ($$props.use === void 0 && $$bindings.use && use !== void 0) $$bindings.use(use);
	if ($$props.class === void 0 && $$bindings.class && className !== void 0)
		$$bindings.class(className);
	if ($$props.type === void 0 && $$bindings.type && type !== void 0) $$bindings.type(type);
	if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
		$$bindings.placeholder(placeholder);
	if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
	if ($$props.files === void 0 && $$bindings.files && files !== void 0) $$bindings.files(files);
	if ($$props.dirty === void 0 && $$bindings.dirty && dirty !== void 0) $$bindings.dirty(dirty);
	if ($$props.invalid === void 0 && $$bindings.invalid && invalid !== void 0)
		$$bindings.invalid(invalid);
	if ($$props.updateInvalid === void 0 && $$bindings.updateInvalid && updateInvalid !== void 0)
		$$bindings.updateInvalid(updateInvalid);
	if ($$props.emptyValueNull === void 0 && $$bindings.emptyValueNull && emptyValueNull !== void 0)
		$$bindings.emptyValueNull(emptyValueNull);
	if (
		$$props.emptyValueUndefined === void 0 &&
		$$bindings.emptyValueUndefined &&
		emptyValueUndefined !== void 0
	)
		$$bindings.emptyValueUndefined(emptyValueUndefined);
	if ($$props.getAttr === void 0 && $$bindings.getAttr && getAttr !== void 0)
		$$bindings.getAttr(getAttr);
	if ($$props.addAttr === void 0 && $$bindings.addAttr && addAttr !== void 0)
		$$bindings.addAttr(addAttr);
	if ($$props.removeAttr === void 0 && $$bindings.removeAttr && removeAttr !== void 0)
		$$bindings.removeAttr(removeAttr);
	if ($$props.focus === void 0 && $$bindings.focus && focus !== void 0) $$bindings.focus(focus);
	if ($$props.blur === void 0 && $$bindings.blur && blur !== void 0) $$bindings.blur(blur);
	if ($$props.getElement === void 0 && $$bindings.getElement && getElement !== void 0)
		$$bindings.getElement(getElement);
	{
		if (type === 'file') {
			delete valueProp.value;
			valueProp = valueProp;
		} else {
			valueProp.value = value == null ? '' : value;
		}
	}
	return `<input${spread(
		[
			{
				class: escape_attribute_value(
					classMap({
						[className]: true,
						'mdc-text-field__input': true
					})
				)
			},
			{ type: escape_attribute_value(type) },
			{
				placeholder: escape_attribute_value(placeholder)
			},
			escape_object(valueProp),
			escape_object(internalAttrs),
			escape_object($$restProps)
		],
		{}
	)}${add_attribute('this', element, 0)}>`;
});
const Textarea = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $$restProps = compute_rest_props($$props, [
		'use',
		'class',
		'style',
		'value',
		'dirty',
		'invalid',
		'updateInvalid',
		'resizable',
		'getAttr',
		'addAttr',
		'removeAttr',
		'focus',
		'blur',
		'getElement'
	]);
	forwardEventsBuilder(get_current_component());
	let { use = [] } = $$props;
	let { class: className = '' } = $$props;
	let { style = '' } = $$props;
	let { value = '' } = $$props;
	let { dirty = false } = $$props;
	let { invalid = false } = $$props;
	let { updateInvalid = true } = $$props;
	let { resizable = true } = $$props;
	let element;
	let internalAttrs = {};
	function getAttr(name) {
		var _a;
		return name in internalAttrs
			? (_a = internalAttrs[name]) !== null && _a !== void 0
				? _a
				: null
			: getElement().getAttribute(name);
	}
	function addAttr(name, value2) {
		if (internalAttrs[name] !== value2) {
			internalAttrs[name] = value2;
		}
	}
	function removeAttr(name) {
		if (!(name in internalAttrs) || internalAttrs[name] != null) {
			internalAttrs[name] = void 0;
		}
	}
	function focus() {
		getElement().focus();
	}
	function blur() {
		getElement().blur();
	}
	function getElement() {
		return element;
	}
	if ($$props.use === void 0 && $$bindings.use && use !== void 0) $$bindings.use(use);
	if ($$props.class === void 0 && $$bindings.class && className !== void 0)
		$$bindings.class(className);
	if ($$props.style === void 0 && $$bindings.style && style !== void 0) $$bindings.style(style);
	if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
	if ($$props.dirty === void 0 && $$bindings.dirty && dirty !== void 0) $$bindings.dirty(dirty);
	if ($$props.invalid === void 0 && $$bindings.invalid && invalid !== void 0)
		$$bindings.invalid(invalid);
	if ($$props.updateInvalid === void 0 && $$bindings.updateInvalid && updateInvalid !== void 0)
		$$bindings.updateInvalid(updateInvalid);
	if ($$props.resizable === void 0 && $$bindings.resizable && resizable !== void 0)
		$$bindings.resizable(resizable);
	if ($$props.getAttr === void 0 && $$bindings.getAttr && getAttr !== void 0)
		$$bindings.getAttr(getAttr);
	if ($$props.addAttr === void 0 && $$bindings.addAttr && addAttr !== void 0)
		$$bindings.addAttr(addAttr);
	if ($$props.removeAttr === void 0 && $$bindings.removeAttr && removeAttr !== void 0)
		$$bindings.removeAttr(removeAttr);
	if ($$props.focus === void 0 && $$bindings.focus && focus !== void 0) $$bindings.focus(focus);
	if ($$props.blur === void 0 && $$bindings.blur && blur !== void 0) $$bindings.blur(blur);
	if ($$props.getElement === void 0 && $$bindings.getElement && getElement !== void 0)
		$$bindings.getElement(getElement);
	return `<textarea${spread(
		[
			{
				class: escape_attribute_value(
					classMap({
						[className]: true,
						'mdc-text-field__input': true
					})
				)
			},
			{
				style: escape_attribute_value(`${resizable ? '' : 'resize: none; '}${style}`)
			},
			escape_object(internalAttrs),
			escape_object($$restProps)
		],
		{}
	)}${add_attribute('this', element, 0)}>${value || ''}</textarea>`;
});
const { Object: Object_1 } = globals;
const Textfield = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $$restProps = compute_rest_props($$props, [
		'use',
		'class',
		'style',
		'ripple',
		'disabled',
		'required',
		'textarea',
		'variant',
		'noLabel',
		'label',
		'type',
		'value',
		'files',
		'invalid',
		'updateInvalid',
		'dirty',
		'prefix',
		'suffix',
		'validateOnValueChange',
		'useNativeValidation',
		'withLeadingIcon',
		'withTrailingIcon',
		'input',
		'floatingLabel',
		'lineRipple',
		'notchedOutline',
		'focus',
		'blur',
		'layout',
		'getElement'
	]);
	let $$slots = compute_slots(slots);
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
	let { required: required2 = false } = $$props;
	let { textarea = false } = $$props;
	let { variant = textarea ? 'outlined' : 'standard' } = $$props;
	let { noLabel = false } = $$props;
	let { label = void 0 } = $$props;
	let { type = 'text' } = $$props;
	let { value = $$restProps.input$emptyValueUndefined ? void 0 : uninitializedValue } = $$props;
	let { files = uninitializedValue } = $$props;
	const valued = !isUninitializedValue(value) || !isUninitializedValue(files);
	if (isUninitializedValue(value)) {
		value = void 0;
	}
	if (isUninitializedValue(files)) {
		files = null;
	}
	let { invalid = uninitializedValue } = $$props;
	let { updateInvalid = isUninitializedValue(invalid) } = $$props;
	if (isUninitializedValue(invalid)) {
		invalid = false;
	}
	let { dirty = false } = $$props;
	let { prefix = void 0 } = $$props;
	let { suffix = void 0 } = $$props;
	let { validateOnValueChange = updateInvalid } = $$props;
	let { useNativeValidation = updateInvalid } = $$props;
	let { withLeadingIcon = uninitializedValue } = $$props;
	let { withTrailingIcon = uninitializedValue } = $$props;
	let { input = void 0 } = $$props;
	let { floatingLabel = void 0 } = $$props;
	let { lineRipple = void 0 } = $$props;
	let { notchedOutline = void 0 } = $$props;
	let element;
	let internalClasses = {};
	let internalStyles = {};
	let helperId = void 0;
	let addLayoutListener = getContext('SMUI:addLayoutListener');
	let removeLayoutListener;
	new Promise((resolve) => resolve);
	if (addLayoutListener) {
		removeLayoutListener = addLayoutListener(layout);
	}
	onDestroy(() => {
		if (removeLayoutListener) {
			removeLayoutListener();
		}
	});
	function focus() {
		input === null || input === void 0 ? void 0 : input.focus();
	}
	function blur() {
		input === null || input === void 0 ? void 0 : input.blur();
	}
	function layout() {}
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
	if ($$props.required === void 0 && $$bindings.required && required2 !== void 0)
		$$bindings.required(required2);
	if ($$props.textarea === void 0 && $$bindings.textarea && textarea !== void 0)
		$$bindings.textarea(textarea);
	if ($$props.variant === void 0 && $$bindings.variant && variant !== void 0)
		$$bindings.variant(variant);
	if ($$props.noLabel === void 0 && $$bindings.noLabel && noLabel !== void 0)
		$$bindings.noLabel(noLabel);
	if ($$props.label === void 0 && $$bindings.label && label !== void 0) $$bindings.label(label);
	if ($$props.type === void 0 && $$bindings.type && type !== void 0) $$bindings.type(type);
	if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
	if ($$props.files === void 0 && $$bindings.files && files !== void 0) $$bindings.files(files);
	if ($$props.invalid === void 0 && $$bindings.invalid && invalid !== void 0)
		$$bindings.invalid(invalid);
	if ($$props.updateInvalid === void 0 && $$bindings.updateInvalid && updateInvalid !== void 0)
		$$bindings.updateInvalid(updateInvalid);
	if ($$props.dirty === void 0 && $$bindings.dirty && dirty !== void 0) $$bindings.dirty(dirty);
	if ($$props.prefix === void 0 && $$bindings.prefix && prefix !== void 0)
		$$bindings.prefix(prefix);
	if ($$props.suffix === void 0 && $$bindings.suffix && suffix !== void 0)
		$$bindings.suffix(suffix);
	if (
		$$props.validateOnValueChange === void 0 &&
		$$bindings.validateOnValueChange &&
		validateOnValueChange !== void 0
	)
		$$bindings.validateOnValueChange(validateOnValueChange);
	if (
		$$props.useNativeValidation === void 0 &&
		$$bindings.useNativeValidation &&
		useNativeValidation !== void 0
	)
		$$bindings.useNativeValidation(useNativeValidation);
	if (
		$$props.withLeadingIcon === void 0 &&
		$$bindings.withLeadingIcon &&
		withLeadingIcon !== void 0
	)
		$$bindings.withLeadingIcon(withLeadingIcon);
	if (
		$$props.withTrailingIcon === void 0 &&
		$$bindings.withTrailingIcon &&
		withTrailingIcon !== void 0
	)
		$$bindings.withTrailingIcon(withTrailingIcon);
	if ($$props.input === void 0 && $$bindings.input && input !== void 0) $$bindings.input(input);
	if ($$props.floatingLabel === void 0 && $$bindings.floatingLabel && floatingLabel !== void 0)
		$$bindings.floatingLabel(floatingLabel);
	if ($$props.lineRipple === void 0 && $$bindings.lineRipple && lineRipple !== void 0)
		$$bindings.lineRipple(lineRipple);
	if ($$props.notchedOutline === void 0 && $$bindings.notchedOutline && notchedOutline !== void 0)
		$$bindings.notchedOutline(notchedOutline);
	if ($$props.focus === void 0 && $$bindings.focus && focus !== void 0) $$bindings.focus(focus);
	if ($$props.blur === void 0 && $$bindings.blur && blur !== void 0) $$bindings.blur(blur);
	if ($$props.layout === void 0 && $$bindings.layout && layout !== void 0)
		$$bindings.layout(layout);
	if ($$props.getElement === void 0 && $$bindings.getElement && getElement !== void 0)
		$$bindings.getElement(getElement);
	let $$settled;
	let $$rendered;
	do {
		$$settled = true;
		input && input.getElement();
		$$rendered = `${
			valued
				? `<label${spread(
						[
							{
								class: escape_attribute_value(
									classMap({
										[className]: true,
										'mdc-text-field': true,
										'mdc-text-field--disabled': disabled,
										'mdc-text-field--textarea': textarea,
										'mdc-text-field--filled': variant === 'filled',
										'mdc-text-field--outlined': variant === 'outlined',
										'smui-text-field--standard': variant === 'standard' && !textarea,
										'mdc-text-field--no-label': noLabel || (label == null && !$$slots.label),
										'mdc-text-field--label-floating': value != null && value !== '',
										'mdc-text-field--with-leading-icon': isUninitializedValue(withLeadingIcon)
											? $$slots.leadingIcon
											: withLeadingIcon,
										'mdc-text-field--with-trailing-icon': isUninitializedValue(withTrailingIcon)
											? $$slots.trailingIcon
											: withTrailingIcon,
										'mdc-text-field--with-internal-counter': textarea && $$slots.internalCounter,
										'mdc-text-field--invalid': invalid,
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
							{
								for: escape_attribute_value(
									/* suppress a11y warning, since this is wrapped */
									void 0
								)
							},
							escape_object(
								exclude($$restProps, ['input$', 'label$', 'ripple$', 'outline$', 'helperLine$'])
							)
						],
						{}
				  )}${add_attribute('this', element, 0)}>${
						!textarea && variant !== 'outlined'
							? `${variant === 'filled' ? `<span class="mdc-text-field__ripple"></span>` : ``}
      ${
				!noLabel && (label != null || $$slots.label)
					? `${validate_component(FloatingLabel, 'FloatingLabel').$$render(
							$$result,
							Object_1.assign(
								{},
								{
									floatAbove: value != null && value !== ''
								},
								{ required: required2 },
								{ wrapped: true },
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
			}`
							: ``
				  }
    ${
			textarea || variant === 'outlined'
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
													{
														floatAbove: value != null && value !== ''
													},
													{ required: required2 },
													{ wrapped: true },
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
    ${validate_component(ContextFragment, 'ContextFragment').$$render(
			$$result,
			{
				key: 'SMUI:textfield:icon:leading',
				value: true
			},
			{},
			{
				default: () => {
					return `${slots.leadingIcon ? slots.leadingIcon({}) : ``}`;
				}
			}
		)}
    ${slots.default ? slots.default({}) : ``}
    ${
			textarea && typeof value === 'string'
				? `<span${add_attribute(
						'class',
						classMap({
							'mdc-text-field__resizer':
								!('input$resizable' in $$restProps) || $$restProps.input$resizable
						}),
						0
				  )}>${validate_component(Textarea, 'Textarea').$$render(
						$$result,
						Object_1.assign(
							{},
							{ disabled },
							{ required: required2 },
							{ updateInvalid },
							{ 'aria-controls': helperId },
							{ 'aria-describedby': helperId },
							prefixFilter($$restProps, 'input$'),
							{ this: input },
							{ value },
							{ dirty },
							{ invalid }
						),
						{
							this: ($$value) => {
								input = $$value;
								$$settled = false;
							},
							value: ($$value) => {
								value = $$value;
								$$settled = false;
							},
							dirty: ($$value) => {
								dirty = $$value;
								$$settled = false;
							},
							invalid: ($$value) => {
								invalid = $$value;
								$$settled = false;
							}
						},
						{}
				  )}
        ${slots.internalCounter ? slots.internalCounter({}) : ``}</span>`
				: `${slots.prefix ? slots.prefix({}) : ``}
      ${
				prefix != null
					? `${validate_component(Prefix, 'Prefix').$$render(
							$$result,
							{},
							{},
							{
								default: () => {
									return `${escape(prefix)}`;
								}
							}
					  )}`
					: ``
			}
      ${validate_component(Input, 'Input').$$render(
				$$result,
				Object_1.assign(
					{},
					{ type },
					{ disabled },
					{ required: required2 },
					{ updateInvalid },
					{ 'aria-controls': helperId },
					{ 'aria-describedby': helperId },
					noLabel && label != null ? { placeholder: label } : {},
					prefixFilter($$restProps, 'input$'),
					{ this: input },
					{ value },
					{ files },
					{ dirty },
					{ invalid }
				),
				{
					this: ($$value) => {
						input = $$value;
						$$settled = false;
					},
					value: ($$value) => {
						value = $$value;
						$$settled = false;
					},
					files: ($$value) => {
						files = $$value;
						$$settled = false;
					},
					dirty: ($$value) => {
						dirty = $$value;
						$$settled = false;
					},
					invalid: ($$value) => {
						invalid = $$value;
						$$settled = false;
					}
				},
				{}
			)}
      ${
				suffix != null
					? `${validate_component(Suffix, 'Suffix').$$render(
							$$result,
							{},
							{},
							{
								default: () => {
									return `${escape(suffix)}`;
								}
							}
					  )}`
					: ``
			}
      ${slots.suffix ? slots.suffix({}) : ``}`
		}
    ${validate_component(ContextFragment, 'ContextFragment').$$render(
			$$result,
			{
				key: 'SMUI:textfield:icon:leading',
				value: false
			},
			{},
			{
				default: () => {
					return `${slots.trailingIcon ? slots.trailingIcon({}) : ``}`;
				}
			}
		)}
    ${
			!textarea && variant !== 'outlined' && ripple
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
		}</label>`
				: `<div${spread(
						[
							{
								class: escape_attribute_value(
									classMap({
										[className]: true,
										'mdc-text-field': true,
										'mdc-text-field--disabled': disabled,
										'mdc-text-field--textarea': textarea,
										'mdc-text-field--filled': variant === 'filled',
										'mdc-text-field--outlined': variant === 'outlined',
										'smui-text-field--standard': variant === 'standard' && !textarea,
										'mdc-text-field--no-label': noLabel || !$$slots.label,
										'mdc-text-field--with-leading-icon': $$slots.leadingIcon,
										'mdc-text-field--with-trailing-icon': $$slots.trailingIcon,
										'mdc-text-field--invalid': invalid,
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
								exclude($$restProps, ['input$', 'label$', 'ripple$', 'outline$', 'helperLine$'])
							)
						],
						{}
				  )}${add_attribute('this', element, 0)}>${slots.label ? slots.label({}) : ``}
    ${validate_component(ContextFragment, 'ContextFragment').$$render(
			$$result,
			{
				key: 'SMUI:textfield:icon:leading',
				value: true
			},
			{},
			{
				default: () => {
					return `${slots.leadingIcon ? slots.leadingIcon({}) : ``}`;
				}
			}
		)}
    ${slots.default ? slots.default({}) : ``}
    ${validate_component(ContextFragment, 'ContextFragment').$$render(
			$$result,
			{
				key: 'SMUI:textfield:icon:leading',
				value: false
			},
			{},
			{
				default: () => {
					return `${slots.trailingIcon ? slots.trailingIcon({}) : ``}`;
				}
			}
		)}
    ${slots.ripple ? slots.ripple({}) : ``}</div>`
		}
${
	$$slots.helper
		? `${validate_component(HelperLine, 'HelperLine').$$render(
				$$result,
				Object_1.assign({}, prefixFilter($$restProps, 'helperLine$')),
				{},
				{
					default: () => {
						return `${slots.helper ? slots.helper({}) : ``}`;
					}
				}
		  )}`
		: ``
}`;
	} while (!$$settled);
	return $$rendered;
});
const ProjectDialog_svelte_svelte_type_style_lang = '';
const css$1 = {
	code: '.invalid-field.svelte-1oipm1e{margin:10px;color:#b71c1cff}.dialog-divider.svelte-1oipm1e{margin:2px 0;border-bottom:1px solid #bfbfbf}',
	map: null
};
const ProjectDialog = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $projectForm, $$unsubscribe_projectForm;
	let $$unsubscribe_projectId;
	let $projectName, $$unsubscribe_projectName;
	let $$unsubscribe_userStore;
	$$unsubscribe_userStore = subscribe(userStore, (value) => value);
	createEventDispatcher();
	let { loadingDialog = true } = $$props;
	let { openCreateDialog = false } = $$props;
	let { projectName = field('projectName', '', [required()]) } = $$props;
	$$unsubscribe_projectName = subscribe(projectName, (value) => ($projectName = value));
	let { projectId = field('projectId', 0) } = $$props;
	$$unsubscribe_projectId = subscribe(projectId, (value) => value);
	let { projectForm = form(projectName, projectId) } = $$props;
	$$unsubscribe_projectForm = subscribe(projectForm, (value) => ($projectForm = value));
	let { isEdit = false } = $$props;
	if ($$props.loadingDialog === void 0 && $$bindings.loadingDialog && loadingDialog !== void 0)
		$$bindings.loadingDialog(loadingDialog);
	if (
		$$props.openCreateDialog === void 0 &&
		$$bindings.openCreateDialog &&
		openCreateDialog !== void 0
	)
		$$bindings.openCreateDialog(openCreateDialog);
	if ($$props.projectName === void 0 && $$bindings.projectName && projectName !== void 0)
		$$bindings.projectName(projectName);
	if ($$props.projectId === void 0 && $$bindings.projectId && projectId !== void 0)
		$$bindings.projectId(projectId);
	if ($$props.projectForm === void 0 && $$bindings.projectForm && projectForm !== void 0)
		$$bindings.projectForm(projectForm);
	if ($$props.isEdit === void 0 && $$bindings.isEdit && isEdit !== void 0)
		$$bindings.isEdit(isEdit);
	$$result.css.add(css$1);
	let $$settled;
	let $$rendered;
	do {
		$$settled = true;
		$$rendered = `<div>${validate_component(Dialog, 'Dialog').$$render(
			$$result,
			{
				'aria-labelledby': 'mandatory-title',
				'aria-describedby': 'mandatory-content',
				scrimClickAction: '',
				escapeKeyAction: '',
				surface$style: 'min-width: calc(100vw - 60vw); max-width: calc(100vw - 100px);',
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
							id: 'mandatory-title',
							'data-testid': 'mandatory-title'
						},
						{},
						{
							default: () => {
								return `${escape(isEdit ? 'Edit' : 'Create')} project`;
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
			{ id: 'mandatory-content' },
			{},
			{
				default: () => {
					return `${validate_component(Textfield, 'Textfield').$$render(
						$$result,
						{
							disabled: !loadingDialog,
							'data-testid': 'project-field',
							label: 'Project Name',
							variant: 'outlined',
							invalid: !$projectForm.valid,
							required: true,
							input$placeholder: 'Ex: Project 1',
							style: 'width: 100%',
							helperLine$style: 'width: 100%;',
							value: $projectName.value
						},
						{
							value: ($$value) => {
								$projectName.value = $$value;
								$$settled = false;
							}
						},
						{}
					)}
			${
				$projectForm.hasError('projectName.required')
					? `<span class="invalid-field svelte-1oipm1e">Project name is required</span>`
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
					action: 'submit',
					disabled: !$projectForm.valid
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
	$$unsubscribe_projectId();
	$$unsubscribe_projectName();
	$$unsubscribe_userStore();
	return $$rendered;
});
const ProjectDeleteConfirmation = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $$unsubscribe_userStore;
	$$unsubscribe_userStore = subscribe(userStore, (value) => value);
	createEventDispatcher();
	let { openDeleteDialog = false } = $$props;
	let { selectedProjectForDelete } = $$props;
	if (
		$$props.openDeleteDialog === void 0 &&
		$$bindings.openDeleteDialog &&
		openDeleteDialog !== void 0
	)
		$$bindings.openDeleteDialog(openDeleteDialog);
	if (
		$$props.selectedProjectForDelete === void 0 &&
		$$bindings.selectedProjectForDelete &&
		selectedProjectForDelete !== void 0
	)
		$$bindings.selectedProjectForDelete(selectedProjectForDelete);
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
								return `Project Delete Confirmation`;
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
					return `Are you sure to delete project ${escape(
						selectedProjectForDelete?.projectName || 'N/A'
					)}?
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
});
const _page_svelte_svelte_type_style_lang = '';
const css = {
	code: '.container.svelte-u4xay1.mdc-card{padding:20px}.table-container.svelte-u4xay1{max-height:75vh;overflow-y:auto}.divider.svelte-u4xay1{margin:16px 0;border-bottom:1px solid #bfbfbf}',
	map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $$unsubscribe_projectId = noop,
		$$subscribe_projectId = () => (
			$$unsubscribe_projectId(),
			($$unsubscribe_projectId = subscribe(projectId, ($$value) => $$value)),
			projectId
		);
	let $$unsubscribe_projectName = noop,
		$$subscribe_projectName = () => (
			$$unsubscribe_projectName(),
			($$unsubscribe_projectName = subscribe(projectName, ($$value) => $$value)),
			projectName
		);
	let $$unsubscribe_userStore;
	$$unsubscribe_userStore = subscribe(userStore, (value) => value);
	let loading = false;
	let loadingDialog = true;
	let openCreateDialog = false;
	let openDeleteDialog = false;
	let projectList = [];
	let selectedProjectForDelete;
	let projectName = field('projectName', '', [required()]);
	$$subscribe_projectName();
	let projectId = field('projectId', 0);
	$$subscribe_projectId();
	let projectForm = form(projectName, projectId);
	let isEdit = false;
	$$result.css.add(css);
	let $$settled;
	let $$rendered;
	do {
		$$settled = true;
		$$rendered = `<div class="container svelte-u4xay1">${validate_component(Card, 'Card').$$render(
			$$result,
			{ style: 'padding: 20px;' },
			{},
			{
				default: () => {
					return `<div style="display: flex; justify-content: space-between"><h2 class="mdc-typography--headline6" style="margin: 0;">Project Management</h2>
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
							{ path: mdiFolderPlus },
							{},
							{}
						)}
				${validate_component(CommonLabel, 'Label').$$render(
					$$result,
					{ style: 'margin-left: 5px' },
					{},
					{
						default: () => {
							return `Create project`;
						}
					}
				)}`;
					}
				}
			)}</div>
		<div class="divider svelte-u4xay1"></div>
		<div class="table-container svelte-u4xay1">${validate_component(DataTable, 'DataTable').$$render(
			$$result,
			{
				'table$aria-label': 'Project List',
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
									{ numeric: true },
									{},
									{
										default: () => {
											return `ID`;
										}
									}
								)}
						${validate_component(Cell, 'Cell').$$render(
							$$result,
							{ style: 'width: 90%;' },
							{},
							{
								default: () => {
									return `Name`;
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
							return `${each(projectList, (project) => {
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
														return `${escape(project.projectId)}`;
													}
												}
											)}
							${validate_component(Cell, 'Cell').$$render(
								$$result,
								{},
								{},
								{
									default: () => {
										return `${escape(project.projectName)}`;
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
														{ path: mdiFolderEdit },
														{},
														{}
													)}
									${validate_component(CommonLabel, 'Label').$$render(
										$$result,
										{ style: 'margin-left: 5px' },
										{},
										{
											default: () => {
												return `Edit`;
											}
										}
									)}
								`;
												}
											}
										)}
								${validate_component(Button, 'Button').$$render(
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

	${validate_component(ProjectDialog, 'ProjectDialog').$$render(
		$$result,
		{
			loadingDialog,
			openCreateDialog,
			projectName,
			projectForm,
			projectId,
			isEdit
		},
		{
			loadingDialog: ($$value) => {
				loadingDialog = $$value;
				$$settled = false;
			},
			openCreateDialog: ($$value) => {
				openCreateDialog = $$value;
				$$settled = false;
			},
			projectName: ($$value) => {
				projectName = $$value;
				$$settled = false;
			},
			projectForm: ($$value) => {
				projectForm = $$value;
				$$settled = false;
			},
			projectId: ($$value) => {
				projectId = $$value;
				$$settled = false;
			},
			isEdit: ($$value) => {
				isEdit = $$value;
				$$settled = false;
			}
		},
		{}
	)}
	${validate_component(ProjectDeleteConfirmation, 'ProjectDeleteConfirmation').$$render(
		$$result,
		{
			openDeleteDialog,
			selectedProjectForDelete
		},
		{
			openDeleteDialog: ($$value) => {
				openDeleteDialog = $$value;
				$$settled = false;
			},
			selectedProjectForDelete: ($$value) => {
				selectedProjectForDelete = $$value;
				$$settled = false;
			}
		},
		{}
	)}
</div>`;
	} while (!$$settled);
	$$unsubscribe_projectId();
	$$unsubscribe_projectName();
	$$unsubscribe_userStore();
	return $$rendered;
});
export { Page as default };
