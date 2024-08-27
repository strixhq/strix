const createProperty = value => ({ enumerable: false, value });

const createPointer = (value, refreshCallback = value => value) => {

	const
		BASE_SYMBOL = Symbol(performance.now()),
		BASE_WATCHER_ARR = []
	;

	Object.defineProperty(window, BASE_SYMBOL, {
		enumerable: false,
		get() {
			return value;
		},
		set(newValue) {
			BASE_WATCHER_ARR.forEach(x => x(newValue));
			return value = refreshCallback(newValue)
		}
	});

	const BASE_POINTER = Object.defineProperties({}, {
		toString: createProperty(() => BASE_SYMBOL),
		watch: createProperty((callbackFn) => {
			BASE_WATCHER_ARR.push(callbackFn);
			return BASE_POINTER
		}),
		to: createProperty((destinationValue, durationMs) => {
			if(typeof value !== "number") {
				return BASE_POINTER;
			}
			createPointer(BASE_POINTER)
		})
	})

	return BASE_POINTER;
}

const $ = (value, setterFn = x => x) => {

	const
		BASE_SYMBOL = Symbol(performance.now()),
		WATCHER_CALLBACKS = [],
		GETTER_FN = {
			get() {
				return value;
			}
		}
	;

	Object.defineProperty(window, BASE_SYMBOL, GETTER_FN);

	Object.defineProperty($, BASE_SYMBOL, {
		set(newValue) {
			WATCHER_CALLBACKS.forEach(x => x ? x(newValue) : undefined);
			value = setterFn(newValue);
			return true;
		},
		...GETTER_FN,
	});

	return {
		toString() {
			return BASE_SYMBOL;
		},
		watch(callbackFn) {
			WATCHER_CALLBACKS.push(callbackFn);
			return this;
		},
		into(transformerFn) {
			return 
		},
		fork() {
			return $(value);
		},
	}
};

function App() {

	const count = $(0);

	return html`
		<div>
	`;
}

const ptr = new Proxy((value, refreshCallback = value => value) => {

	let hasDisposed = false;

	const
		BASE_SYMBOL = Symbol(performance.now()),
		BASE_WATCHER_POOL = [],
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
			toString: createProperty(() => hasDisposed
				? undefined
				: BASE_SYMBOL
			),
			watch: createProperty((callbackFn) => {
				if(callbackFn) {
					BASE_WATCHER_POOL.push(callbackFn);
				}
			}),
			[Symbol.dispose]: createProperty(() => hasDisposed = true),
			to: createProperty((destination, transition, options = { infinite: true }) => {
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
	},
	set(t, prop, newValue) {
		return window[prop] = newValue
	}
});

export { ptr }