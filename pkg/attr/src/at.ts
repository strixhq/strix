import { createProxiedAttribute } from './create-proxied-attribute.ts';

export const at = createProxiedAttribute((prop, value, ref) => {
	if (value[Symbol.for('PTR_IDENTIFIER')]) {
		value.watch((newValue: any) => ref.setAttribute(prop, newValue));
	} else {
		ref.setAttribute(prop, value);
	}
});
