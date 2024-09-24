import { getEnv, getRandom as random } from 'jsr:@strix/core@0.0.7'

const { PTR_IDENTIFIER } = getEnv

const PUBLISHED_PTR = {},
	GLOBAL_TOKEN = ((TOKEN_BUF) => {
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
	}

Object.defineProperty(window, `Symbol(${GLOBAL_TOKEN})`, {
	configurable: false,
	enumerable: false,
	value: (symbol: symbol) => PUBLISHED_PTR[symbol],
})

export const $ = new Proxy((
	initValue: any,
	setterFn: Function = (newValue) => newValue,
	watcherFnList: Function[] = [],
): object => {
	const IS_PTR = initValue[PTR_IDENTIFIER]

	let value = IS_PTR ? initValue.$ : initValue

	const BASE_SYMBOL = Symbol(GLOBAL_TOKEN),
		BASE_PTR = {
			set value(newValue) {
				const SET_TIMESTAMP = performance.now()
				value = SETTER_STD(setterFn(newValue), watcherFnList, { SET_TIMESTAMP })
			},
			get value() {
				return value
			},
			set $(newValue) {
				value = SETTER_STD(setterFn(newValue), watcherFnList)
			},
			get $() {
				return value
			},
			watch(...newWatcherFnList: Function[]) {
				if (newWatcherFnList.length) {
					newWatcherFnList.forEach((watcherFn) => watcherFn(value))
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
				return $(value)
			},
			into(setterFn: Function) {
				return $(this, setterFn)
			},
			emit(eventIdentifier: string | symbol, data: undefined) {
			},
			listen(listnerCallbacks: object) {
			},
			get [PTR_IDENTIFIER]() {
				return true
			},
			[Symbol.toPrimitive]() {
				return BASE_SYMBOL
			},
		}

	if (IS_PTR) {
		initValue.watch((newValue) => BASE_PTR.$ = newValue)
	}

	PUBLISHED_PTR[BASE_SYMBOL] = BASE_PTR
	return BASE_PTR
}, {
	get(_, prop) {
		let ptrBuffer;
		return typeof prop !== "symbol"
			? undefined
			: prop in PUBLISHED_PTR
			? PUBLISHED_PTR[prop].$
			: typeof (ptrBuffer = window[prop.toString()]) == "function"
			? ptrBuffer(prop)?.$
			: undefined
	},
	set(_, value, prop) {
		let ptrBuffer;
		return typeof prop !== "symbol"
			? undefined
			: prop in PUBLISHED_PTR
			? PUBLISHED_PTR[prop].$ = value
			: typeof (ptrBuffer = window[prop.toString()]) == "function"
			? ptrBuffer(prop).$ = value
			: undefined
	}
})