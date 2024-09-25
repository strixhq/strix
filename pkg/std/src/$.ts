import { getEnv, getRandom as random } from 'jsr:@strix/core@0.0.9'

const { PTR_IDENTIFIER } = getEnv

const PUBLISHED_PTR = {},
	GLOBAL_TOKEN = ((TOKEN_BUF) => {
		while ((TOKEN_BUF = random(16)) in globalThis) {}
		return TOKEN_BUF
	})(),
	SETTER_STD = (
		newValue: undefined,
		watcherFnList: Function[],
		// setData: object = {},
	) => {
		watcherFnList.forEach((watcherFn) => watcherFn(newValue))
		return newValue
	}

Object.defineProperty(globalThis, GLOBAL_TOKEN, {
	configurable: false,
	enumerable: false,
	value: (symbol: symbol) => PUBLISHED_PTR[symbol],
})

export const $: Function = new Proxy((
	initValue: any,
	setterFn: Function = (newValue) => newValue,
	options = {
		name: "",
		watcherFnList: []
	},
): object => {
	const IS_PTR = initValue[PTR_IDENTIFIER]

	let value = IS_PTR ? initValue.$ : initValue

	const BASE_SYMBOL = Symbol(GLOBAL_TOKEN + options.name),
		BASE_PTR = Object.assign(
			{
				get value() {
					return value;
				},
				set value(newValue) {
					value = SETTER_STD(setterFn(newValue), options.watcherFnList);
				},
				get $() {
					return this.value
				},
				set $(newValue) {
					this.value = newValue
				},
				watch(...newWatcherFnList: Function[]) {
					if (newWatcherFnList.length) {
						newWatcherFnList.forEach((watcherFn) => watcherFn(value))
						options.watcherFnList?.push?.(...newWatcherFnList)
					}
					return this
				},
				publishSymbol(name = "") {
					const NEW_SYMBOL = Symbol(GLOBAL_TOKEN + name)
					PUBLISHED_PTR[NEW_SYMBOL] = this
					return NEW_SYMBOL
				},
				fork(
					setterFn: Function = (newValue) => newValue,
					options = {
						name: "",
						watcherFnList: []
					},
				) {
					return $(value, setterFn, options)
				},
				into(setterFn: Function) {
					return $(this, setterFn)
				},
				get [PTR_IDENTIFIER]() {
					return true
				},
				[Symbol.toPrimitive]() {
					return BASE_SYMBOL
				},
			},(
				typeof value == "number"
				? {
					async to(destination: number, duration: number = 1000): Promise<object> {
						requestAnimationFrame()
						return this;
					},
					scheduleTo(destination: number, duration: number = 1000): object {
						return this;
					}
				} : {})
		)

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
			: typeof (ptrBuffer = globalThis[prop.description.slice(0, 16)]) == "function"
			? ptrBuffer(prop)?.$
			: undefined
	},
	set(_, value, prop) {
		let ptrBuffer;
		return typeof prop !== "symbol"
			? undefined
			: prop in PUBLISHED_PTR
			? PUBLISHED_PTR[prop].$ = value
			: typeof (ptrBuffer = globalThis[prop.description.slice(0, 16)]) == "function"
			? ptrBuffer(prop).$ = value
			: undefined
	}
})