import { $ } from 'jsr:@strix/std@0.1.3';

const SH_SYMBOL_TO_PRIMITIVE = Symbol.toPrimitive;

export const createProxiedAttribute = (
	registererFn: (prop: string, value: any, ref: any, root?: HTMLElement | undefined) => void,
): object => {
	const ATTR_CACHE = {},
		BASE_PTR = $((value: any, ref: HTMLElement, root: HTMLElement | undefined = undefined) => {
			Object.keys(value).forEach((REGISTERER_PROP) => {
				registererFn(REGISTERER_PROP, value[REGISTERER_PROP], ref, root ? root : undefined);
			});
		}),
		BASE_SYMBOL_RETURNER = () => BASE_PTR.publishSymbol(),
		BASE_PROXY = new Proxy({}, {
			get(myTarget, prop) {
				return prop == SH_SYMBOL_TO_PRIMITIVE
					? BASE_SYMBOL_RETURNER
					: prop in ATTR_CACHE
					? ATTR_CACHE[prop]
					: ATTR_CACHE[prop] = $((value: any, ref: any, root: HTMLElement | undefined) =>
						registererFn(prop as string, value, ref, root)
					)
						.publishSymbol();
			},
		});

	return BASE_PROXY as object;
};
