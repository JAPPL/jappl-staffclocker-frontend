import {
	c as create_ssr_component,
	b as compute_rest_props,
	d as get_current_component,
	a as subscribe,
	s as setContext,
	k as set_store_value,
	f as spread,
	h as escape_attribute_value,
	i as escape_object,
	j as add_attribute,
	g as getContext,
	v as validate_component
} from '../../../../chunks/index3.js';
import { B as Button } from '../../../../chunks/Button.js';
import { C as CommonLabel } from '../../../../chunks/user.js';
import { r as readable, w as writable } from '../../../../chunks/index2.js';
import {
	f as forwardEventsBuilder,
	c as classMap,
	a as classAdderBuilder,
	e as exclude,
	p as prefixFilter
} from '../../../../chunks/Ripple.js';
import 'firebase/app';
import 'firebase/auth';
import '../../../../chunks/Toaster.svelte_svelte_type_style_lang.js';
const BottomAppBar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $$restProps = compute_rest_props($$props, [
		'use',
		'class',
		'style',
		'color',
		'variant',
		'getPropStore',
		'getElement'
	]);
	let $colorStore, $$unsubscribe_colorStore;
	forwardEventsBuilder(get_current_component());
	let { use = [] } = $$props;
	let { class: className = '' } = $$props;
	let { style = '' } = $$props;
	let { color = 'primary' } = $$props;
	let { variant = 'standard' } = $$props;
	let element;
	let internalStyles = {};
	const colorStore = writable(color);
	$$unsubscribe_colorStore = subscribe(colorStore, (value) => ($colorStore = value));
	let withFab = false;
	let adjustOffset = 0;
	setContext('SMUI:bottom-app-bar:color', colorStore);
	let propStoreSet;
	let propStore = readable({ withFab, adjustOffset, variant }, (set) => {
		propStoreSet = set;
	});
	function getPropStore() {
		return propStore;
	}
	function getElement() {
		return element;
	}
	if ($$props.use === void 0 && $$bindings.use && use !== void 0) $$bindings.use(use);
	if ($$props.class === void 0 && $$bindings.class && className !== void 0)
		$$bindings.class(className);
	if ($$props.style === void 0 && $$bindings.style && style !== void 0) $$bindings.style(style);
	if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
	if ($$props.variant === void 0 && $$bindings.variant && variant !== void 0)
		$$bindings.variant(variant);
	if ($$props.getPropStore === void 0 && $$bindings.getPropStore && getPropStore !== void 0)
		$$bindings.getPropStore(getPropStore);
	if ($$props.getElement === void 0 && $$bindings.getElement && getElement !== void 0)
		$$bindings.getElement(getElement);
	set_store_value(colorStore, ($colorStore = color), $colorStore);
	{
		if (propStoreSet) {
			propStoreSet({ withFab, adjustOffset, variant });
		}
	}
	$$unsubscribe_colorStore();
	return `

<div${spread(
		[
			{
				class: escape_attribute_value(
					classMap({
						[className]: true,
						'smui-bottom-app-bar': true,
						'smui-bottom-app-bar--standard': variant === 'standard',
						'smui-bottom-app-bar--fixed': variant === 'fixed'
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
const Paper = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $$restProps = compute_rest_props($$props, [
		'use',
		'class',
		'variant',
		'square',
		'color',
		'elevation',
		'transition',
		'getElement'
	]);
	forwardEventsBuilder(get_current_component());
	let { use = [] } = $$props;
	let { class: className = '' } = $$props;
	let { variant = 'raised' } = $$props;
	let { square = false } = $$props;
	let { color = 'default' } = $$props;
	let { elevation = 1 } = $$props;
	let { transition = false } = $$props;
	let element;
	function getElement() {
		return element;
	}
	if ($$props.use === void 0 && $$bindings.use && use !== void 0) $$bindings.use(use);
	if ($$props.class === void 0 && $$bindings.class && className !== void 0)
		$$bindings.class(className);
	if ($$props.variant === void 0 && $$bindings.variant && variant !== void 0)
		$$bindings.variant(variant);
	if ($$props.square === void 0 && $$bindings.square && square !== void 0)
		$$bindings.square(square);
	if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
	if ($$props.elevation === void 0 && $$bindings.elevation && elevation !== void 0)
		$$bindings.elevation(elevation);
	if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0)
		$$bindings.transition(transition);
	if ($$props.getElement === void 0 && $$bindings.getElement && getElement !== void 0)
		$$bindings.getElement(getElement);
	return `<div${spread(
		[
			{
				class: escape_attribute_value(
					classMap({
						[className]: true,
						'smui-paper': true,
						'smui-paper--raised': variant === 'raised',
						'smui-paper--unelevated': variant === 'unelevated',
						'smui-paper--outlined': variant === 'outlined',
						['smui-paper--elevation-z' + elevation]: elevation !== 0 && variant === 'raised',
						'smui-paper--rounded': !square,
						['smui-paper--color-' + color]: color !== 'default',
						'smui-paper-transition': transition
					})
				)
			},
			escape_object($$restProps)
		],
		{}
	)}${add_attribute('this', element, 0)}>${slots.default ? slots.default({}) : ``}
</div>`;
});
classAdderBuilder({
	class: 'smui-paper__content',
	tag: 'div'
});
classAdderBuilder({
	class: 'smui-paper__title',
	tag: 'h5'
});
classAdderBuilder({
	class: 'smui-paper__subtitle',
	tag: 'h6'
});
const Section = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let usePass;
	let $$restProps = compute_rest_props($$props, ['use', 'class', 'fabInset', 'getElement']);
	let $color, $$unsubscribe_color;
	const forwardEvents = forwardEventsBuilder(get_current_component());
	let { use = [] } = $$props;
	let { class: className = '' } = $$props;
	let { fabInset = false } = $$props;
	let element;
	const color = getContext('SMUI:bottom-app-bar:color');
	$$unsubscribe_color = subscribe(color, (value) => ($color = value));
	function getElement() {
		return element.getElement();
	}
	if ($$props.use === void 0 && $$bindings.use && use !== void 0) $$bindings.use(use);
	if ($$props.class === void 0 && $$bindings.class && className !== void 0)
		$$bindings.class(className);
	if ($$props.fabInset === void 0 && $$bindings.fabInset && fabInset !== void 0)
		$$bindings.fabInset(fabInset);
	if ($$props.getElement === void 0 && $$bindings.getElement && getElement !== void 0)
		$$bindings.getElement(getElement);
	let $$settled;
	let $$rendered;
	do {
		$$settled = true;
		usePass = [forwardEvents, ...use];
		$$rendered = `${validate_component(Paper, 'Paper').$$render(
			$$result,
			Object.assign(
				{},
				{ use: usePass },
				{
					class: classMap({
						[className]: true,
						'smui-bottom-app-bar__section': true,
						'smui-bottom-app-bar__section--fab-inset': fabInset
					})
				},
				{ color: $color },
				{ variant: 'unelevated' },
				{ square: true },
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
	$$unsubscribe_color();
	return $$rendered;
});
const InnerGrid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	forwardEventsBuilder(get_current_component());
	let { use = [] } = $$props;
	let { class: className = '' } = $$props;
	let element;
	function getElement() {
		return element;
	}
	if ($$props.use === void 0 && $$bindings.use && use !== void 0) $$bindings.use(use);
	if ($$props.class === void 0 && $$bindings.class && className !== void 0)
		$$bindings.class(className);
	if ($$props.getElement === void 0 && $$bindings.getElement && getElement !== void 0)
		$$bindings.getElement(getElement);
	return `<div${add_attribute(
		'class',
		classMap({
			[className]: true,
			'mdc-layout-grid__inner': true
		}),
		0
	)}${add_attribute('this', element, 0)}>${slots.default ? slots.default({}) : ``}
</div>`;
});
const LayoutGrid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $$restProps = compute_rest_props($$props, [
		'use',
		'class',
		'fixedColumnWidth',
		'align',
		'getElement'
	]);
	forwardEventsBuilder(get_current_component());
	let { use = [] } = $$props;
	let { class: className = '' } = $$props;
	let { fixedColumnWidth = false } = $$props;
	let { align = void 0 } = $$props;
	let element;
	function getElement() {
		return element;
	}
	if ($$props.use === void 0 && $$bindings.use && use !== void 0) $$bindings.use(use);
	if ($$props.class === void 0 && $$bindings.class && className !== void 0)
		$$bindings.class(className);
	if (
		$$props.fixedColumnWidth === void 0 &&
		$$bindings.fixedColumnWidth &&
		fixedColumnWidth !== void 0
	)
		$$bindings.fixedColumnWidth(fixedColumnWidth);
	if ($$props.align === void 0 && $$bindings.align && align !== void 0) $$bindings.align(align);
	if ($$props.getElement === void 0 && $$bindings.getElement && getElement !== void 0)
		$$bindings.getElement(getElement);
	return `<div${spread(
		[
			{
				class: escape_attribute_value(
					classMap({
						[className]: true,
						'mdc-layout-grid': true,
						'mdc-layout-grid--fixed-column-width': fixedColumnWidth,
						['mdc-layout-grid--align-' + align]: align != null
					})
				)
			},
			escape_object(exclude($$restProps, ['innerGrid$']))
		],
		{}
	)}${add_attribute('this', element, 0)}>${validate_component(InnerGrid, 'InnerGrid').$$render(
		$$result,
		Object.assign({}, prefixFilter($$restProps, 'innerGrid$')),
		{},
		{
			default: () => {
				return `${slots.default ? slots.default({}) : ``}`;
			}
		}
	)}
</div>`;
});
const Cell = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $$restProps = compute_rest_props($$props, [
		'use',
		'class',
		'align',
		'order',
		'span',
		'spanDevices',
		'getElement'
	]);
	forwardEventsBuilder(get_current_component());
	let { use = [] } = $$props;
	let { class: className = '' } = $$props;
	let { align = void 0 } = $$props;
	let { order = void 0 } = $$props;
	let { span = void 0 } = $$props;
	let { spanDevices = {} } = $$props;
	let element;
	function getElement() {
		return element;
	}
	if ($$props.use === void 0 && $$bindings.use && use !== void 0) $$bindings.use(use);
	if ($$props.class === void 0 && $$bindings.class && className !== void 0)
		$$bindings.class(className);
	if ($$props.align === void 0 && $$bindings.align && align !== void 0) $$bindings.align(align);
	if ($$props.order === void 0 && $$bindings.order && order !== void 0) $$bindings.order(order);
	if ($$props.span === void 0 && $$bindings.span && span !== void 0) $$bindings.span(span);
	if ($$props.spanDevices === void 0 && $$bindings.spanDevices && spanDevices !== void 0)
		$$bindings.spanDevices(spanDevices);
	if ($$props.getElement === void 0 && $$bindings.getElement && getElement !== void 0)
		$$bindings.getElement(getElement);
	return `<div${spread(
		[
			{
				class: escape_attribute_value(
					classMap({
						[className]: true,
						'mdc-layout-grid__cell': true,
						['mdc-layout-grid__cell--align-' + align]: align != null,
						['mdc-layout-grid__cell--order-' + order]: order != null,
						['mdc-layout-grid__cell--span-' + span]: span != null,
						...Object.fromEntries(
							Object.entries(spanDevices).map(([device, span2]) => [
								`mdc-layout-grid__cell--span-${span2}-${device}`,
								true
							])
						)
					})
				)
			},
			escape_object($$restProps)
		],
		{}
	)}${add_attribute('this', element, 0)}>${slots.default ? slots.default({}) : ``}
</div>`;
});
const _page_svelte_svelte_type_style_lang = '';
const css = {
	code: '.full-screen-size.svelte-10oxyio{min-height:80vh;position:relative}.divider.svelte-10oxyio{margin:0 4px;border-left:1px solid white;height:35px}.bottom-app-margin.svelte-10oxyio .smui-bottom-app-bar > .smui-bottom-app-bar__section{padding:13px}.user-image-size.svelte-10oxyio{height:70px}.google-logo.svelte-10oxyio{width:25px;margin-right:10px}.center.svelte-10oxyio{position:absolute;top:45%;left:50%;transform:translate(-50%, -50%)}p.svelte-10oxyio{color:#ffffff}h1.svelte-10oxyio{color:#ffffff;font-size:32px}.login.svelte-10oxyio{border-radius:30px;background-color:#130f42;width:410px;padding:30px}',
	map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let bottomAppBar;
	let loading = false;
	$$result.css.add(css);
	let $$settled;
	let $$rendered;
	do {
		$$settled = true;
		$$rendered = `<div class="full-screen-size svelte-10oxyio"><div class="center svelte-10oxyio"><div class="login svelte-10oxyio"><div class="login-card-content">${validate_component(
			LayoutGrid,
			'LayoutGrid'
		).$$render(
			$$result,
			{ style: 'padding: 0' },
			{},
			{
				default: () => {
					return `${validate_component(Cell, 'Cell').$$render(
						$$result,
						{ span: 9 },
						{},
						{
							default: () => {
								return `<h1 style="margin-bottom: 15px;" class="svelte-10oxyio">Welcome to JAPPL</h1>`;
							}
						}
					)}
					${validate_component(Cell, 'Cell').$$render(
						$$result,
						{ span: 3 },
						{},
						{
							default: () => {
								return `<img src="user.png" class="user-image-size svelte-10oxyio" alt="user">`;
							}
						}
					)}`;
				}
			}
		)}

				<p class="svelte-10oxyio">Options</p>

				<div class="test">${validate_component(Button, 'Button').$$render(
					$$result,
					{
						style: '\n							background-color: #FF6B6B;\n							border-radius: 30px;\n							width: 100%\n						',
						variant: 'raised',
						ripple: false,
						disabled: loading
					},
					{},
					{
						default: () => {
							return `<img src="google.png" class="google-logo svelte-10oxyio" alt="logo">
						${validate_component(CommonLabel, 'Label').$$render(
							$$result,
							{},
							{},
							{
								default: () => {
									return `Login with Google`;
								}
							}
						)}`;
						}
					}
				)}</div>
				<p style="margin-bottom: 0" class="svelte-10oxyio">if you can not login, please contact admin.</p></div></div></div></div>
<div class="bottom-app-margin svelte-10oxyio">${validate_component(
			BottomAppBar,
			'BottomAppBar'
		).$$render(
			$$result,
			{ this: bottomAppBar },
			{
				this: ($$value) => {
					bottomAppBar = $$value;
					$$settled = false;
				}
			},
			{
				default: () => {
					return `${validate_component(Section, 'Section').$$render(
						$$result,
						{},
						{},
						{
							default: () => {
								return `${validate_component(Button, 'Button').$$render(
									$$result,
									{ variant: 'raised' },
									{},
									{
										default: () => {
											return `${validate_component(CommonLabel, 'Label').$$render(
												$$result,
												{},
												{},
												{
													default: () => {
														return `Contact`;
													}
												}
											)}`;
										}
									}
								)}
			<div class="divider svelte-10oxyio"></div>
			${validate_component(Button, 'Button').$$render(
				$$result,
				{ variant: 'raised' },
				{},
				{
					default: () => {
						return `${validate_component(CommonLabel, 'Label').$$render(
							$$result,
							{},
							{},
							{
								default: () => {
									return `About`;
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
	return $$rendered;
});
export { Page as default };
