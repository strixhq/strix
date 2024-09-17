import { random } from 'jsr:@ihasq/random@0.1.6';

const PUBLISHED_PTR = {},
	GLOBAL_TOKEN = (() => {
		let TOKEN_BUF;
		while (`Symbol(${TOKEN_BUF = random(32)})` in window) {}
		return TOKEN_BUF;
	})(),
	SETTER_STD = (
		newValue: undefined,
		watcherFnList: Function[],
		setData: object = {},
	) => {
		watcherFnList.forEach((watcherFn) => watcherFn(newValue, setData.SET_TIMESTAMP));
		return newValue;
	},
	$ = (
		value: undefined,
		setterFn: Function = (newValue) => newValue,
		watcherFnList: Function[] = [],
	): object => {
		const BASE_SYMBOL = Symbol(GLOBAL_TOKEN),
			BASE_PTR = {
				set value(newValue) {
					const SET_TIMESTAMP = performance.now();
					value = SETTER_STD(setterFn(newValue), watcherFnList, { SET_TIMESTAMP });
				},
				get value() {
					return value;
				},
				set $(newValue) {
					value = SETTER_STD(setterFn(newValue), watcherFnList);
				},
				get $() {
					return value;
				},
				watch(...newWatcherFnList: Function[]) {
					if (newWatcherFnList.length) {
						newWatcherFnList.forEach((watcherFn) => watcherFn(value));
						watcherFnList.push(...newWatcherFnList);
					}
					return this;
				},
				publishSymbol() {
					const NEW_SYMBOL = Symbol(GLOBAL_TOKEN);
					PUBLISHED_PTR[NEW_SYMBOL] = this;
					return NEW_SYMBOL;
				},
				fork() {
					return $(value);
				},
				emit(eventIdentifier: string | symbol, data: undefined) {
				},
				listen(listnerCallbacks: object) {
				},
				extend() {
					if (Array.isArray(value)) {
						return $(Object.assign(value, {
							swap(a: undefined, b: undefined) {
							},
							pushReturn(...elements: undefined[]) {
								this.push(...elements);
								return elements;
							},
						}));
					}
				},
				[Symbol.for('PTR_IDENTIFIER')]: true,
				[Symbol.toPrimitive]() {
					return BASE_SYMBOL;
				},
			};

		PUBLISHED_PTR[BASE_SYMBOL] = BASE_PTR;
		return BASE_PTR;
	};

Object.defineProperty(window, `Symbol(${GLOBAL_TOKEN})`, {
	configurable: false,
	enumerable: false,
	value: (symbol: symbol) => symbol in PUBLISHED_PTR ? PUBLISHED_PTR[symbol] : undefined,
});

export { $ };
