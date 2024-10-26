import { getAddress, getEnv, getPointer, getRandom as random, getStatic } from 'jsr:@strix/core@0.0.19'

const { PTR_IDENTIFIER, STRIX_PUBLISH_NEW_SYMBOL } = getEnv

const {
	Object_isFrozen, Object_assign, Object_freeze,

	Array_isArray,
	Reflect_getPrototypeOf,

	Promise_prototype, Object_prototype, Function_prototype,

	Symbol_toPrimitive
} = getStatic

const isTemp = ([firstArg]) => Array_isArray(firstArg) && Object_isFrozen(firstArg) && 'raw' in firstArg && Array_isArray(firstArg.raw) && Object_isFrozen(firstArg.raw);

const PUBLISHED_PTR = {};
const GLOBAL_TOKEN = ((TOKEN_BUF) => {
	while ((TOKEN_BUF = random(16)) in globalThis) {}
	return TOKEN_BUF
})();

Object.defineProperty(globalThis, GLOBAL_TOKEN, {
	configurable: false,
	enumerable: false,
	value: Object_freeze(Object_assign((symbol) => PUBLISHED_PTR[symbol], {
		has: (symbol) => symbol in PUBLISHED_PTR,
	})),
})

/**
 * @type { (name: string) => symbol }
 */
const createSymbol = (name) => Symbol(GLOBAL_TOKEN + name);

/**
 * @type { (newValue: any, watcherFnList: Function[]) => any }
 */
const SETTER_STD = (newValue, watcherFnList) => {
	watcherFnList.forEach((watcherFn) => watcherFn(newValue))
	return newValue
};
	curveGenerators = {},
	globalWatcherStore = new WeakMap();
;

// interface StrixPointer {
// 	[Symbol_toPrimitive]: (hint: string) => symbol | number;
// 	publishSymbol: () => symbol;
// 	watchers: Function[];
// 	$?: any;
// 	watch?: (...watcherFnList) => 
// }

const arrayActionList = {
	watch(action) {
		return {}
	},
	pushReturn(...elements) {
		this.push.apply(null, elements);
		return elements;
	},
	unshiftReturn(...elements) {
		this.unshift.apply(null, elements);
		return elements;
	},
}

const createAction = (action, oldValue, newValue) => ({ action, oldValue, newValue });



export const $: Function = new Proxy((
	initValue: any,
	setterFn: Function = (newValue) => newValue,
	options = {
		name: '',
		watcherFnList: [],
	},
): object => {
	const PTR_TYPE = (typeof initValue == 'symbol' && globalThis[getAddress(initValue)]?.has(initValue)) ? 'inherited-symbol' : 'object'
	const IS_PTR = initValue[PTR_IDENTIFIER]

	let value = IS_PTR ? initValue.$ : initValue

	const BASE_SYMBOL = Symbol(GLOBAL_TOKEN + options.name),
		BASE_PTR = Object_assign(
			{
				get value() {
					return value
				},
				set value(newValue) {
					value = SETTER_STD(setterFn(newValue), options.newWatcherFnList)
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
						options.newWatcherFnList?.push?.(...newWatcherFnList)
					}
					return this
				},
				publishSymbol(name = '') {
					const NEW_SYMBOL = Symbol(GLOBAL_TOKEN + name)
					PUBLISHED_PTR[NEW_SYMBOL] = this
					return NEW_SYMBOL
				},
				fork(
					setterFn: Function = (newValue) => newValue,
					options = {
						name: '',
						watcherFnList: [],
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
				[Symbol_toPrimitive]() {
					return BASE_SYMBOL
				},
			},
			typeof value == 'number'
				? {
					async to(destination: number, duration: number = 1000): Promise<object> {
						requestAnimationFrame()
						return this
					},
					scheduleTo(destination: number, duration: number = 1000): object {
						return this
					},
				}
				: {},
		)

	if (IS_PTR) {
		initValue.watch((newValue) => BASE_PTR.$ = newValue)
	}

	PUBLISHED_PTR[BASE_SYMBOL] = BASE_PTR
	return BASE_PTR
}, {
	get(_, prop) {
		let ptrBuffer
		return typeof prop !== 'symbol'
			? undefined
			: prop in PUBLISHED_PTR
			? PUBLISHED_PTR[prop].$
			: typeof (ptrBuffer = globalThis[prop.description.slice(0, 16)]) == 'function'
			? ptrBuffer(prop)?.$
			: undefined
	},
	set(_, value, prop) {
		let ptrBuffer
		return typeof prop !== 'symbol'
			? undefined
			: prop in PUBLISHED_PTR
			? PUBLISHED_PTR[prop].$ = value
			: typeof (ptrBuffer = globalThis[prop.description.slice(0, 16)]) == 'function'
			? ptrBuffer(prop).$ = value
			: undefined
	},
})

// const test: $<number> = $(0)

// test.$++

// const obj = {
// 	[test as any]: "a"
// }