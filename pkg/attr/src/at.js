import { createProxiedAttribute } from './create-proxied-attribute.js';

export const at = createProxiedAttribute((prop, value, ref) => {
	if (value[Symbol.for('PTR_IDENTIFIER')]) {
		value.watch((newValue) => ref.setAttribute(prop, newValue));
	} else {
		ref.setAttribute(prop, value);
	}
});
