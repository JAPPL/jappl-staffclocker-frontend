import { c as create_ssr_component, v as validate_component } from '../../../chunks/index3.js';
import '../../../chunks/Toaster.svelte_svelte_type_style_lang.js';
import { T as Toaster } from '../../../chunks/Toaster.js';
const _layout_svelte_svelte_type_style_lang = '';
const css = {
	code: '.logo-size.svelte-1h4pdnr{width:137px;margin:8px}',
	map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	$$result.css.add(css);
	return `${validate_component(Toaster, 'Toaster').$$render($$result, {}, {}, {})}
<img src="logo-dark.png" class="logo-size svelte-1h4pdnr" alt="logo">
${slots.default ? slots.default({}) : ``}`;
});
export { Layout as default };
