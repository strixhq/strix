import { createProxiedAttribute } from './create-proxied-attribute.js';

export const on = createProxiedAttribute((prop, value, ref) => {
	ref.addEventListener(prop, (...args) => value.apply(null, args), { passive: true });
	if (value[Symbol.for('PTR_IDENTIFIER')]) {
		value.watch((newValue) => value = newValue);
	}
});
