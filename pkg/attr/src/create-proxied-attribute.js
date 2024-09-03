import { $ } from 'jsr:@ihasq/esptr@0.1.9';

const SH_SYMBOL_TO_PRIMITIVE = Symbol.toPrimitive;

export const createProxiedAttribute = (registererFn) => {
	const ATTR_CACHE = {},
		BASE_SYMBOL = $((value, ref) => {
			Reflect.ownKeys(value).forEach((prop) => {
				registererFn(prop, value[prop], ref);
			});
		})[SH_SYMBOL_TO_PRIMITIVE](),
		BASE_SYMBOL_RETURNER = () => BASE_SYMBOL,
		BASE_PROXY = new Proxy({}, {
			get(myTarget, prop) {
				return prop == SH_SYMBOL_TO_PRIMITIVE
					? BASE_SYMBOL_RETURNER
					: prop in ATTR_CACHE
					? ATTR_CACHE[prop]
					: ATTR_CACHE[prop] = $((value, ref) => registererFn(prop, value, ref))[SH_SYMBOL_TO_PRIMITIVE]();
			},
		});

	return BASE_PROXY;
};
