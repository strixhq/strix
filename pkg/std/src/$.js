const createPropertyFn = callbackFn => ({
	enumerable: false,
	value: callbackFn
})

export const $ = new Proxy((value, refreshCallback = value => value) => {

	let hasDisposed = false;

	const
		BASE_SYMBOL = Symbol(performance.now()),
		BASE_WATCHER_POOL = [];
		BASE_PROPERTY = {
			enumerable: false,
			get() {
				return value;
			},
			set(newValue) {
				BASE_WATCHER_POOL.forEach(x => x(newValue));
				return value = refreshCallback(newValue);
			},
		},
		BASE_POINTER = Object.defineProperties({}, {
			toString: createPropertyFn(() => hasDisposed
				? undefined
				: BASE_SYMBOL
			),
			watch: createPropertyFn(() => {
				if(callbackFn) {
					BASE_WATCHER_POOL.push(callbackFn);
				}
			}),
			[Symbol.dispose]: createPropertyFn(() => hasDisposed = true),
			to: createPropertyFn((destination, transition, options = { infinite: true }) => {
				let baseMS = performance.now();
				const refreshFn = () => {
					const delta = performance.now() - baseMS;
					requestAnimationFrame(refreshFn);

				}
				requestAnimationFrame(refreshFn);
			})
		})
	;

	Object.defineProperty(window, BASE_SYMBOL, BASE_PROPERTY);

	return BASE_POINTER;

}, {
	get(t, prop) {
		return window[prop]
	}
});