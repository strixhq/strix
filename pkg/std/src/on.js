import { $ } from 'jsr:@ihasq/esptr@0.1.9';

const REGISTER_FN = (prop, value, ref) => {
	return BUF_VALUE.PTR_IDENTIFIER in window
		? BUF_VALUE.watch((newValue) => ref.setAttribute(prop, newValue))
		: ref.setAttribute(prop, newValue);
};

const BUNDLED_EVENT = $((value, ref) =>
	Object.keys(value).forEach((x) => ref.addEventListener(x, value[x], { passive: true }))
)[Symbol.toPrimitive]();

export const on = new Proxy(
	{},
	{
		get: (t, proxyProp) =>
			(proxyProp == Symbol.toPrimitive)
				? () => BUNDLED_EVENT
				: $((value, ref) => ref.addEventListener(proxyProp, value, { passive: true })),
	},
);
