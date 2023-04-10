import {
	c as create_ssr_component,
	b as compute_rest_props,
	d as get_current_component,
	g as getContext,
	v as validate_component,
	m as missing_component,
	w as get_store_value
} from './index3.js';
import { f as forwardEventsBuilder, c as classMap, S as SmuiElement } from './Ripple.js';
import { w as writable } from './index2.js';
const CommonLabel = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $$restProps = compute_rest_props($$props, ['use', 'class', 'component', 'tag', 'getElement']);
	const forwardEvents = forwardEventsBuilder(get_current_component());
	let { use = [] } = $$props;
	let { class: className = '' } = $$props;
	let element;
	let { component = SmuiElement } = $$props;
	let { tag = component === SmuiElement ? 'span' : void 0 } = $$props;
	const context = getContext('SMUI:label:context');
	const tabindex = getContext('SMUI:label:tabindex');
	function getElement() {
		return element.getElement();
	}
	if ($$props.use === void 0 && $$bindings.use && use !== void 0) $$bindings.use(use);
	if ($$props.class === void 0 && $$bindings.class && className !== void 0)
		$$bindings.class(className);
	if ($$props.component === void 0 && $$bindings.component && component !== void 0)
		$$bindings.component(component);
	if ($$props.tag === void 0 && $$bindings.tag && tag !== void 0) $$bindings.tag(tag);
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
						'mdc-button__label': context === 'button',
						'mdc-fab__label': context === 'fab',
						'mdc-tab__text-label': context === 'tab',
						'mdc-image-list__label': context === 'image-list',
						'mdc-snackbar__label': context === 'snackbar',
						'mdc-banner__text': context === 'banner',
						'mdc-segmented-button__label': context === 'segmented-button',
						'mdc-data-table__pagination-rows-per-page-label': context === 'data-table:pagination',
						'mdc-data-table__header-cell-label': context === 'data-table:sortable-header-cell'
					})
				},
				context === 'snackbar' ? { 'aria-atomic': 'false' } : {},
				{ tabindex },
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
var stores = {};
function getStorage(type) {
	return type === 'local' ? localStorage : sessionStorage;
}
function persisted(key, initialValue, options) {
	const serializer = (options == null ? void 0 : options.serializer) ?? JSON;
	const storageType = (options == null ? void 0 : options.storage) ?? 'local';
	const browser = typeof window !== 'undefined' && typeof document !== 'undefined';
	function updateStorage(key2, value) {
		if (!browser) return;
		getStorage(storageType).setItem(key2, serializer.stringify(value));
	}
	if (!stores[key]) {
		const store = writable(initialValue, (set2) => {
			const json = browser ? getStorage(storageType).getItem(key) : null;
			if (json) {
				set2(serializer.parse(json));
			}
			if (browser) {
				const handleStorage = (event) => {
					if (event.key === key) set2(event.newValue ? serializer.parse(event.newValue) : null);
				};
				window.addEventListener('storage', handleStorage);
				return () => window.removeEventListener('storage', handleStorage);
			}
		});
		const { subscribe, set } = store;
		stores[key] = {
			set(value) {
				updateStorage(key, value);
				set(value);
			},
			update(updater) {
				const value = updater(get_store_value(store));
				updateStorage(key, value);
				set(value);
			},
			subscribe
		};
	}
	return stores[key];
}
const userStore = persisted('user', {
	name: null,
	email: null,
	picture: null,
	token: null
});
export { CommonLabel as C, userStore as u };
