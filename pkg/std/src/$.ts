import { random } from 'jsr:@ihasq/random@0.1.6'

const PUBLISHED_PTR = {},
	GLOBAL_TOKEN = (() => {
		let TOKEN_BUF
		while (`Symbol(${TOKEN_BUF = random(32)})` in window) {}
		return TOKEN_BUF
	})(),
	SETTER_STD = (
		newValue: undefined,
		watcherFnList: Function[],
		setData: object = {},
	) => {
		watcherFnList.forEach((watcherFn) => watcherFn(newValue))
		return newValue
	},
	$ = (
		value: any,
		setterFn: Function = (newValue) => newValue,
		watcherFnList: Function[] = [],
	): object => {
		const IS_VALUE_PTR = value[Symbol.for("PTR_IDENTIFIER")];
	
		let valueBuffer = IS_VALUE_PTR
			? value.$
			: value
		;

		const BASE_SYMBOL = Symbol(GLOBAL_TOKEN),
			BASE_PTR = {
				set value(newValue) {
					valueBuffer = SETTER_STD(setterFn(newValue), watcherFnList)
				},
				get value() {
					return valueBuffer
				},
				set $(newValue) {
					valueBuffer = SETTER_STD(setterFn(newValue), watcherFnList)
				},
				get $() {
					return valueBuffer
				},
				watch(...newWatcherFnList: Function[]) {
					if (newWatcherFnList.length) {
						newWatcherFnList.forEach((watcherFn) => watcherFn(valueBuffer))
						watcherFnList.push(...newWatcherFnList)
					}
					return this
				},
				publishSymbol() {
					const NEW_SYMBOL = Symbol(GLOBAL_TOKEN)
					PUBLISHED_PTR[NEW_SYMBOL] = this
					return NEW_SYMBOL
				},
				fork() {
					return $(valueBuffer)
				},
				emit(eventIdentifier: string | symbol, data: undefined) {
				},
				listen(listnerCallbacks: object) {
				},
				extend() {
					if (Array.isArray(valueBuffer)) {
						return $(Object.assign(valueBuffer, {
							swap(a: undefined, b: undefined) {
							},
							pushReturn(...elements: undefined[]) {
								this.push(...elements)
								return elements
							},
						}))
					}
				},
				into(callbackFn) {
					return $(this, newValue => callbackFn(newValue))
				},
				[Symbol.for('PTR_IDENTIFIER')]: true,
				[Symbol.toPrimitive]() {
					return BASE_SYMBOL
				},
			}
			if(IS_VALUE_PTR) {
				value.watch(newValue => BASE_PTR.$ = newValue)
			}

		PUBLISHED_PTR[BASE_SYMBOL] = BASE_PTR
		return BASE_PTR
	}

Object.defineProperty(window, `Symbol(${GLOBAL_TOKEN})`, {
	configurable: false,
	enumerable: false,
	value: (symbol: symbol) => symbol in PUBLISHED_PTR ? PUBLISHED_PTR[symbol] : undefined,
})

export { $ }
