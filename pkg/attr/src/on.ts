import { createProxiedAttribute } from './create-proxied-attribute.ts'

export const on: object = createProxiedAttribute((prop, value, ref) => {
	const IS_PTR = value[Symbol.for('PTR_IDENTIFIER')]
	if (IS_PTR) {
		value.watch((newValue) => value.$ = newValue)
	}
	ref.addEventListener(prop, IS_PTR ? (e) => value.$(e) : value, { passive: true })
}, 'on')
