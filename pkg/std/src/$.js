export const $ = new Proxy((value, refreshCallback = value => value) => {

	let hasDisposed = false;

	const
		BASE_SYMBOL = Symbol(performance.now()),
		BASE_PROPERTY = {
			enumerable: false,
			get() {
				return value;
			},
			set(newValue) {
				return value = refreshCallback(newValue);
			},
		},
		BASE_POINTER = Object.defineProperties({}, {
			toString: {
				enumerable: false,
				value() {
					return hasDisposed
						? undefined
						: BASE_SYMBOL
				},
			},
			[Symbol.dispose]: {
				enumerable: false,
				value() {
					hasDisposed = true;
				}
			}
		})
	;

	Object.defineProperty(window, BASE_SYMBOL, BASE_PROPERTY);

	return BASE_POINTER;

}, {
	get(t, prop) {
		return window[prop]
	}
})