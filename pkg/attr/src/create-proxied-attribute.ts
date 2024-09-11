import { $ } from 'jsr:@ihasq/esptr@0.1.9';

const SH_SYMBOL_TO_PRIMITIVE = Symbol.toPrimitive;

export const createProxiedAttribute = (registererFn: (prop: string, value: any, ref: any) => void): object => {
	const ATTR_CACHE = {},
		BASE_SYMBOL = $((value: any, ref: HTMLElement) => {
			Object.keys(value).forEach((REGISTERER_PROP) => {
				registererFn(REGISTERER_PROP, value[REGISTERER_PROP], ref);
			});
		})[SH_SYMBOL_TO_PRIMITIVE](),
		BASE_SYMBOL_RETURNER = () => BASE_SYMBOL,
		BASE_PROXY = new Proxy({}, {
			get(myTarget, prop) {
				return prop == SH_SYMBOL_TO_PRIMITIVE
					? BASE_SYMBOL_RETURNER
					: prop in ATTR_CACHE
					? ATTR_CACHE[prop]
					: ATTR_CACHE[prop] = $((value: any, ref: any) => registererFn(prop as string, value, ref))
						[SH_SYMBOL_TO_PRIMITIVE]();
			},
		});

	return BASE_PROXY as object;
};
