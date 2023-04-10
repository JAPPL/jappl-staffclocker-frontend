import { c as create_ssr_component, j as add_attribute, e as escape } from './index3.js';
const Index_svelte_svelte_type_style_lang = '';
const css = {
	code: 'svg.svelte-dmmfjb{vertical-align:middle}',
	map: null
};
const Index = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let inverse;
	let spintime;
	let spinfunc;
	let style;
	let { path } = $$props;
	let { size = 1 } = $$props;
	let { color = null } = $$props;
	let { flip = null } = $$props;
	let { rotate = 0 } = $$props;
	let { spin = false } = $$props;
	let { title = '' } = $$props;
	if (Number(size)) size = Number(size);
	const getStyles = () => {
		const transform = [];
		const styles = [];
		if (size !== null) {
			const width = typeof size === 'string' ? size : `${size * 1.5}rem`;
			styles.push(['width', width]);
			styles.push(['height', width]);
		}
		styles.push(['fill', color !== null ? color : 'currentColor']);
		if (flip === true || flip === 'h') {
			transform.push('scaleX(-1)');
		}
		if (flip === true || flip === 'v') {
			transform.push('scaleY(-1)');
		}
		if (rotate != 0) {
			transform.push(`rotate(${rotate}deg)`);
		}
		if (transform.length > 0) {
			styles.push(['transform', transform.join(' ')]);
			styles.push(['transform-origin', 'center']);
		}
		return styles.reduce((cur, item) => {
			return `${cur} ${item[0]}:${item[1]};`;
		}, '');
	};
	if ($$props.path === void 0 && $$bindings.path && path !== void 0) $$bindings.path(path);
	if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
	if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
	if ($$props.flip === void 0 && $$bindings.flip && flip !== void 0) $$bindings.flip(flip);
	if ($$props.rotate === void 0 && $$bindings.rotate && rotate !== void 0)
		$$bindings.rotate(rotate);
	if ($$props.spin === void 0 && $$bindings.spin && spin !== void 0) $$bindings.spin(spin);
	if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
	$$result.css.add(css);
	inverse = typeof spin !== 'boolean' && spin < 0 ? true : false;
	spintime = Math.abs(spin === true ? 2 : spin);
	spinfunc = inverse ? 'spin-inverse' : 'spin';
	style = getStyles();
	return `<svg viewBox="0 0 24 24"${add_attribute('style', style, 0)} class="svelte-dmmfjb">${
		title ? `<title>${escape(title)}</title>` : ``
	}${
		spin !== false
			? `${
					inverse
						? `<style>@keyframes spin-inverse { to { transform: rotate(-360deg) } }</style>`
						: `<style>@keyframes spin { to { transform: rotate(360deg) } }</style>`
			  }
    <g${add_attribute(
			'style',
			`animation: ${spinfunc} linear ${spintime}s infinite; transform-origin: center`,
			0
		)}><path${add_attribute('d', path, 0)}></path></g>`
			: `<path${add_attribute('d', path, 0)}></path>`
	}</svg>`;
});
export { Index as I };
