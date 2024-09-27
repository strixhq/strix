import { getAddress, getEnv, getPointer, getRandom as random, getStatic } from 'jsr:@strix/core@0.0.15'

type $ = Function;

const { PTR_IDENTIFIER } = getEnv

const { Object_isFrozen, Object_assign, Object_freeze, Array_isArray, Reflect_getPrototypeOf } = getStatic

const isTemp = ([firstArg]) => Array_isArray(firstArg) && Object_isFrozen(firstArg) && 'raw' in firstArg && Array_isArray(firstArg.raw) && Object_isFrozen(firstArg.raw);
const setAsync = (fn: Function): Function => async (...args) => fn.apply(null, args)

const PUBLISHED_PTR = {},
	GLOBAL_TOKEN = ((TOKEN_BUF) => {
		while ((TOKEN_BUF = random(16)) in globalThis) {}
		return TOKEN_BUF
	})(),
	CREATE_SYMBOL = (name) => Symbol(GLOBAL_TOKEN + name),
	SETTER_STD = (
		newValue: undefined,
		watcherFnList: Function[],
		// setData: object = {},
	) => {
		watcherFnList.forEach((watcherFn) => watcherFn(newValue))
		return newValue
	},
	OBJ_PROTO = Reflect_getPrototypeOf({}),
	FN_PROTO = Reflect_getPrototypeOf(() => {}),
	ASYNCFN_PROTO = Reflect_getPrototypeOf(async () => {})

Object.defineProperty(globalThis, GLOBAL_TOKEN, {
	configurable: false,
	enumerable: false,
	value: Object.freeze(Object.assign((symbol: symbol) => PUBLISHED_PTR[symbol], {
		has: (symbol: symbol) => symbol in PUBLISHED_PTR,
	})),
})

const next$: Function = new Proxy((...args): symbol | undefined => {
	if (!args.length) return
	const firstArg = args[0]
	if (isTemp(firstArg)) {
		// called as template
		const [s, ...v] = args
		v.forEach((vIndex) => {
			if (typeof vIndex == 'symbol') {
				const ptr = getPointer(vIndex)
				if (!ptr) return
			}
		})
	} else {
		const [initValue, setterFn = (newValue: any) => newValue, options = { name: '', watcherFnList: [] }] = args,
			typeofInitValue = typeof initValue,
			BASE_SYMBOL = CREATE_SYMBOL(options.name),
			BASE_PTR: object = {
				[Symbol.toPrimitive](hint) {
					return hint == "number" && typeofInitValue == "number"
						? initValue
						: BASE_SYMBOL
				},
				publishSymbol() {
					const NEW_SYMBOL = CREATE_SYMBOL(options.name);
					PUBLISHED_PTR[NEW_SYMBOL] = this;
					return NEW_SYMBOL
				},
				watchers: [],
			},
			IS_INITVALUE_PTR: boolean = Object_isFrozen(initValue) && initValue[PTR_IDENTIFIER], 
			IS_SETTERFN_ASYNC: boolean = Reflect_getPrototypeOf(setterFn) == ASYNCFN_PROTO
		;

		let value;

		if("string number".includes(typeofInitValue)) {

			Object_assign(BASE_PTR, {
				get $(): any {
					return initValue
				},
				watch(...watcherFnList: Function[]): object {
					if(watcherFnList.length) {
						watcherFnList.forEach(watcherFn => watcherFn(value))
						this.watchers.push.apply(null, watcherFnList)
					}
					return this;
				},
				into(...transformerFnList: Function[]): object {
					const asyncBuf = new WeakMap();
					return transformerFnList.length
						? next$(this, (newValue: any) => {
							for(const transformerFn of transformerFnList) {
								newValue = transformerFn(newValue)
							}
							return newValue
						})
						: this
				}
			}, IS_SETTERFN_ASYNC
				? {
					set $(newValue: any) {
						setterFn(newValue).then(processedNewValue => {
							value = processedNewValue;
							this.watchers.forEach(watcher => watcher(value))
						})
					}
				}
				: {
					set $(newValue: any) {
						value = setterFn(newValue);
						this.watchers.forEach(watcher => watcher(value))
					}
				}
			)

			if(typeofInitValue == "number") {

				Object_assign(BASE_PTR, {
					to(destination: number, duration: number = 1000) {

					}
				})
			}

		} else if(Array_isArray(initValue)) {

		} else if(Reflect_getPrototypeOf(initValue) == OBJ_PROTO) {
			
		}
		
		return Object_freeze(BASE_PTR)
	}
}, {})

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
					value = SETTER_STD(setterFn(newValue), options.watcherFnList)
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
				[Symbol.toPrimitive]() {
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

const x = $({ [app]: "red" })
