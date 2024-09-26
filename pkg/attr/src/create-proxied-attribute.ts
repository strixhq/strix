import { $ } from 'jsr:@strix/std@0.1.11'

const SH_SYMBOL_TO_PRIMITIVE = Symbol.toPrimitive

export const createProxiedAttribute = (
	registererFn: (prop: string, value: any, ref: any, root?: HTMLElement | undefined) => void,
	name: string
): object => {
	const ATTR_CACHE = {},
		BASE_PTR = $((value: any, ref: HTMLElement, root: HTMLElement | undefined = undefined) => {
			Object.keys(value).forEach((REGISTERER_PROP) => {
				registererFn(REGISTERER_PROP, value[REGISTERER_PROP], ref, root ? root : undefined)
			})
		}, undefined, { name }),
		BASE_SYMBOL_RETURNER = () => BASE_PTR.publishSymbol(name),
		BASE_PROXY = new Proxy({}, {
			get(myTarget, prop) {
				return prop == SH_SYMBOL_TO_PRIMITIVE
					? BASE_SYMBOL_RETURNER
					: ATTR_CACHE[prop] ||= $((value: any, ref: any, root: HTMLElement | undefined) => registererFn(prop as string, value, ref, root), undefined, { name })
						.publishSymbol(`${name}.${prop}`)
			},
		})

	return BASE_PROXY as object
}
