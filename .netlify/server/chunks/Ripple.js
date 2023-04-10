import {
	x as listen,
	y as bubble,
	z as prevent_default,
	A as stop_propagation,
	c as create_ssr_component,
	b as compute_rest_props,
	d as get_current_component,
	f as spread,
	i as escape_object,
	j as add_attribute,
	B as is_void,
	g as getContext,
	s as setContext,
	o as onDestroy,
	v as validate_component,
	r as globals,
	m as missing_component
} from './index3.js';
import { MDCRippleFoundation, util } from '@material/ripple';
import { events, ponyfill } from '@material/dom';
function classMap(classObj) {
	return Object.entries(classObj)
		.filter(([name, value]) => name !== '' && value)
		.map(([name]) => name)
		.join(' ');
}
function exclude(obj, keys) {
	let names = Object.getOwnPropertyNames(obj);
	const newObj = {};
	for (let i = 0; i < names.length; i++) {
		const name = names[i];
		const cashIndex = name.indexOf('$');
		if (cashIndex !== -1 && keys.indexOf(name.substring(0, cashIndex + 1)) !== -1) {
			continue;
		}
		if (keys.indexOf(name) !== -1) {
			continue;
		}
		newObj[name] = obj[name];
	}
	return newObj;
}
const oldModifierRegex =
	/^[a-z]+(?::(?:preventDefault|stopPropagation|passive|nonpassive|capture|once|self))+$/;
const newModifierRegex =
	/^[^$]+(?:\$(?:preventDefault|stopPropagation|passive|nonpassive|capture|once|self))+$/;
function forwardEventsBuilder(component) {
	let $on;
	let events2 = [];
	component.$on = (fullEventType, callback) => {
		let eventType = fullEventType;
		let destructor = () => {};
		if ($on) {
			destructor = $on(eventType, callback);
		} else {
			events2.push([eventType, callback]);
		}
		const oldModifierMatch = eventType.match(oldModifierRegex);
		if (oldModifierMatch && console) {
			console.warn(
				'Event modifiers in SMUI now use "$" instead of ":", so that all events can be bound with modifiers. Please update your event binding: ',
				eventType
			);
		}
		return () => {
			destructor();
		};
	};
	function forward(e) {
		bubble(component, e);
	}
	return (node) => {
		const destructors = [];
		const forwardDestructors = {};
		$on = (fullEventType, callback) => {
			let eventType = fullEventType;
			let handler = callback;
			let options = false;
			const oldModifierMatch = eventType.match(oldModifierRegex);
			const newModifierMatch = eventType.match(newModifierRegex);
			const modifierMatch = oldModifierMatch || newModifierMatch;
			if (eventType.match(/^SMUI:\w+:/)) {
				const newEventTypeParts = eventType.split(':');
				let newEventType = '';
				for (let i = 0; i < newEventTypeParts.length; i++) {
					newEventType +=
						i === newEventTypeParts.length - 1
							? ':' + newEventTypeParts[i]
							: newEventTypeParts[i]
									.split('-')
									.map((value) => value.slice(0, 1).toUpperCase() + value.slice(1))
									.join('');
				}
				console.warn(
					`The event ${eventType.split('$')[0]} has been renamed to ${newEventType.split('$')[0]}.`
				);
				eventType = newEventType;
			}
			if (modifierMatch) {
				const parts = eventType.split(oldModifierMatch ? ':' : '$');
				eventType = parts[0];
				const eventOptions = parts.slice(1).reduce((obj, mod) => {
					obj[mod] = true;
					return obj;
				}, {});
				if (eventOptions.passive) {
					options = options || {};
					options.passive = true;
				}
				if (eventOptions.nonpassive) {
					options = options || {};
					options.passive = false;
				}
				if (eventOptions.capture) {
					options = options || {};
					options.capture = true;
				}
				if (eventOptions.once) {
					options = options || {};
					options.once = true;
				}
				if (eventOptions.preventDefault) {
					handler = prevent_default(handler);
				}
				if (eventOptions.stopPropagation) {
					handler = stop_propagation(handler);
				}
			}
			const off = listen(node, eventType, handler, options);
			const destructor = () => {
				off();
				const idx = destructors.indexOf(destructor);
				if (idx > -1) {
					destructors.splice(idx, 1);
				}
			};
			destructors.push(destructor);
			if (!(eventType in forwardDestructors)) {
				forwardDestructors[eventType] = listen(node, eventType, forward);
			}
			return destructor;
		};
		for (let i = 0; i < events2.length; i++) {
			$on(events2[i][0], events2[i][1]);
		}
		return {
			destroy: () => {
				for (let i = 0; i < destructors.length; i++) {
					destructors[i]();
				}
				for (let entry of Object.entries(forwardDestructors)) {
					entry[1]();
				}
			}
		};
	};
}
function prefixFilter(obj, prefix) {
	let names = Object.getOwnPropertyNames(obj);
	const newObj = {};
	for (let i = 0; i < names.length; i++) {
		const name = names[i];
		if (name.substring(0, prefix.length) === prefix) {
			newObj[name.substring(prefix.length)] = obj[name];
		}
	}
	return newObj;
}
const SmuiElement = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let selfClosing;
	let $$restProps = compute_rest_props($$props, ['use', 'tag', 'getElement']);
	let { use = [] } = $$props;
	let { tag } = $$props;
	forwardEventsBuilder(get_current_component());
	let element;
	function getElement() {
		return element;
	}
	if ($$props.use === void 0 && $$bindings.use && use !== void 0) $$bindings.use(use);
	if ($$props.tag === void 0 && $$bindings.tag && tag !== void 0) $$bindings.tag(tag);
	if ($$props.getElement === void 0 && $$bindings.getElement && getElement !== void 0)
		$$bindings.getElement(getElement);
	selfClosing =
		[
			'area',
			'base',
			'br',
			'col',
			'embed',
			'hr',
			'img',
			'input',
			'link',
			'meta',
			'param',
			'source',
			'track',
			'wbr'
		].indexOf(tag) > -1;
	return `${
		selfClosing
			? `${((tag$1) => {
					return tag$1
						? `<${tag}${spread([escape_object($$restProps)], {})}${add_attribute(
								'this',
								element,
								0
						  )}>${is_void(tag$1) ? '' : ``}${is_void(tag$1) ? '' : `</${tag$1}>`}`
						: '';
			  })(tag)}`
			: `${((tag$1) => {
					return tag$1
						? `<${tag}${spread([escape_object($$restProps)], {})}${add_attribute(
								'this',
								element,
								0
						  )}>${is_void(tag$1) ? '' : `${slots.default ? slots.default({}) : ``}`}${
								is_void(tag$1) ? '' : `</${tag$1}>`
						  }`
						: '';
			  })(tag)}`
	}`;
});
const { Object: Object_1 } = globals;
const internals = {
	component: SmuiElement,
	tag: 'div',
	class: '',
	classMap: {},
	contexts: {},
	props: {}
};
const ClassAdder = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $$restProps = compute_rest_props($$props, ['use', 'class', 'component', 'tag', 'getElement']);
	let { use = [] } = $$props;
	let { class: className = '' } = $$props;
	let element;
	const smuiClass = internals.class;
	const smuiClassMap = {};
	const smuiClassUnsubscribes = [];
	const contexts = internals.contexts;
	const props = internals.props;
	let { component = internals.component } = $$props;
	let { tag = component === SmuiElement ? internals.tag : void 0 } = $$props;
	Object.entries(internals.classMap).forEach(([name, context]) => {
		const store = getContext(context);
		if (store && 'subscribe' in store) {
			smuiClassUnsubscribes.push(
				store.subscribe((value) => {
					smuiClassMap[name] = value;
				})
			);
		}
	});
	const forwardEvents = forwardEventsBuilder(get_current_component());
	for (let context in contexts) {
		if (contexts.hasOwnProperty(context)) {
			setContext(context, contexts[context]);
		}
	}
	onDestroy(() => {
		for (const unsubscribe of smuiClassUnsubscribes) {
			unsubscribe();
		}
	});
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
			Object_1.assign(
				{},
				{ tag },
				{ use: [forwardEvents, ...use] },
				{
					class: classMap({
						[className]: true,
						[smuiClass]: true,
						...smuiClassMap
					})
				},
				props,
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
const defaults = Object.assign({}, internals);
function classAdderBuilder(props) {
	return new Proxy(ClassAdder, {
		construct: function (target, args) {
			Object.assign(internals, defaults, props);
			return new target(...args);
		},
		get: function (target, prop) {
			Object.assign(internals, defaults, props);
			return target[prop];
		}
	});
}
const { applyPassive } = events;
const { matches } = ponyfill;
function Ripple(
	node,
	{
		ripple = true,
		surface = false,
		unbounded = false,
		disabled = false,
		color,
		active,
		rippleElement,
		eventTarget,
		activeTarget,
		addClass = (className) => node.classList.add(className),
		removeClass = (className) => node.classList.remove(className),
		addStyle = (name, value) => node.style.setProperty(name, value),
		initPromise = Promise.resolve()
	} = {}
) {
	let instance;
	let addLayoutListener = getContext('SMUI:addLayoutListener');
	let removeLayoutListener;
	let oldActive = active;
	let oldEventTarget = eventTarget;
	let oldActiveTarget = activeTarget;
	function handleProps() {
		if (surface) {
			addClass('mdc-ripple-surface');
			if (color === 'primary') {
				addClass('smui-ripple-surface--primary');
				removeClass('smui-ripple-surface--secondary');
			} else if (color === 'secondary') {
				removeClass('smui-ripple-surface--primary');
				addClass('smui-ripple-surface--secondary');
			} else {
				removeClass('smui-ripple-surface--primary');
				removeClass('smui-ripple-surface--secondary');
			}
		} else {
			removeClass('mdc-ripple-surface');
			removeClass('smui-ripple-surface--primary');
			removeClass('smui-ripple-surface--secondary');
		}
		if (instance && oldActive !== active) {
			oldActive = active;
			if (active) {
				instance.activate();
			} else if (active === false) {
				instance.deactivate();
			}
		}
		if (ripple && !instance) {
			instance = new MDCRippleFoundation({
				addClass,
				browserSupportsCssVars: () => util.supportsCssVariables(window),
				computeBoundingRect: () => (rippleElement || node).getBoundingClientRect(),
				containsEventTarget: (target) => node.contains(target),
				deregisterDocumentInteractionHandler: (evtType, handler) =>
					document.documentElement.removeEventListener(evtType, handler, applyPassive()),
				deregisterInteractionHandler: (evtType, handler) =>
					(eventTarget || node).removeEventListener(evtType, handler, applyPassive()),
				deregisterResizeHandler: (handler) => window.removeEventListener('resize', handler),
				getWindowPageOffset: () => ({
					x: window.pageXOffset,
					y: window.pageYOffset
				}),
				isSurfaceActive: () => (active == null ? matches(activeTarget || node, ':active') : active),
				isSurfaceDisabled: () => !!disabled,
				isUnbounded: () => !!unbounded,
				registerDocumentInteractionHandler: (evtType, handler) =>
					document.documentElement.addEventListener(evtType, handler, applyPassive()),
				registerInteractionHandler: (evtType, handler) =>
					(eventTarget || node).addEventListener(evtType, handler, applyPassive()),
				registerResizeHandler: (handler) => window.addEventListener('resize', handler),
				removeClass,
				updateCssVariable: addStyle
			});
			initPromise.then(() => {
				if (instance) {
					instance.init();
					instance.setUnbounded(unbounded);
				}
			});
		} else if (instance && !ripple) {
			initPromise.then(() => {
				if (instance) {
					instance.destroy();
					instance = void 0;
				}
			});
		}
		if (instance && (oldEventTarget !== eventTarget || oldActiveTarget !== activeTarget)) {
			oldEventTarget = eventTarget;
			oldActiveTarget = activeTarget;
			instance.destroy();
			requestAnimationFrame(() => {
				if (instance) {
					instance.init();
					instance.setUnbounded(unbounded);
				}
			});
		}
		if (!ripple && unbounded) {
			addClass('mdc-ripple-upgraded--unbounded');
		}
	}
	handleProps();
	if (addLayoutListener) {
		removeLayoutListener = addLayoutListener(layout);
	}
	function layout() {
		if (instance) {
			instance.layout();
		}
	}
	return {
		update(props) {
			({
				ripple,
				surface,
				unbounded,
				disabled,
				color,
				active,
				rippleElement,
				eventTarget,
				activeTarget,
				addClass,
				removeClass,
				addStyle,
				initPromise
			} = Object.assign(
				{
					ripple: true,
					surface: false,
					unbounded: false,
					disabled: false,
					color: void 0,
					active: void 0,
					rippleElement: void 0,
					eventTarget: void 0,
					activeTarget: void 0,
					addClass: (className) => node.classList.add(className),
					removeClass: (className) => node.classList.remove(className),
					addStyle: (name, value) => node.style.setProperty(name, value),
					initPromise: Promise.resolve()
				},
				props
			));
			handleProps();
		},
		destroy() {
			if (instance) {
				instance.destroy();
				instance = void 0;
				removeClass('mdc-ripple-surface');
				removeClass('smui-ripple-surface--primary');
				removeClass('smui-ripple-surface--secondary');
			}
			if (removeLayoutListener) {
				removeLayoutListener();
			}
		}
	};
}
export {
	Ripple as R,
	SmuiElement as S,
	classAdderBuilder as a,
	classMap as c,
	exclude as e,
	forwardEventsBuilder as f,
	prefixFilter as p
};
