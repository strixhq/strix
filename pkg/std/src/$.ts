import { random } from 'jsr:@ihasq/random@0.1.6'
import { getEnv } from 'jsr:@strix/core@0.0.5'

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

export const $ = (
	initValue: undefined,
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
			into(callbackFn: Function) {
				return $()
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
							this.push(...elements)
							return elements
						},
					}))
				}
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
}
