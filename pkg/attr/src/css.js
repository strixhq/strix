import { createProxiedAttribute } from './create-proxied-attribute.js';

const RESOLVED_PROP_BUF = {},
	STYLEMAP_BUF = new WeakMap();

export const css = createProxiedAttribute((prop, value, ref) => {
	const RESOLVED_PROP = prop in RESOLVED_PROP_BUF
			? RESOLVED_PROP_BUF[prop]
			: RESOLVED_PROP_BUF[prop] = prop.replace(/[A-Z]/g, (match) => '-' + match).toLowerCase(),
		BASE_STYLEMAP = STYLEMAP_BUF.has(ref) ? STYLEMAP_BUF.get(ref) : (() => {
			const STYLEMAP = ref.attributeStyleMap;
			STYLEMAP_BUF.set(ref, STYLEMAP);
			return STYLEMAP;
		})();

	if (value[Symbol.for('PTR_IDENTIFIER')]) {
		value.watch((newValue) => {
			console.log(newValue)
			BASE_STYLEMAP.set(RESOLVED_PROP, newValue)
		});
	} else {
		BASE_STYLEMAP.set(RESOLVED_PROP, value);
	}
});
