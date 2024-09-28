import { getAddress, getEnv, getPointer, getRandom as random, getStatic } from 'jsr:@strix/core@0.0.19'

type $ = Function;

const { PTR_IDENTIFIER } = getEnv

const {
	Object_isFrozen, Object_assign, Object_freeze, Array_isArray, Reflect_getPrototypeOf,
	Promise_prototype,
	Object_prototype,
	Function_prototype
} = getStatic

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
	FN_PROTO = Reflect_getPrototypeOf(() => {}),
	ASYNCFN_PROTO = Reflect_getPrototypeOf(async () => {}),
	curveGenerators = {}
;

Object.defineProperty(globalThis, GLOBAL_TOKEN, {
	configurable: false,
	enumerable: false,
	value: Object.freeze(Object.assign((symbol: symbol) => PUBLISHED_PTR[symbol], {
		has: (symbol: symbol) => symbol in PUBLISHED_PTR,
	})),
})

const next$: Function = Object.assign((...args): symbol | undefined => {
	if (!args.length) return;
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
				execWatcherFn(newValue) {
					this.watchers.forEach(watcher => watcher(newValue))
				}
			},
			IS_INITVALUE_PTR: boolean = Object_isFrozen(initValue) && initValue[PTR_IDENTIFIER], 
			PTR_INTERFACE = [{
				[PTR_IDENTIFIER]: true,
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
			}],
			valueHistory: any[] = [],
			actionHistory: { action: string, oldValue: any, newValue: any, curveGeneratorFn?: Function }[] = []
		;

		let
			value = initValue,
			valueHistoryIndex = 0,
			valueHistoryMaxIndex = 0
		;

		valueHistory.push(value);

		if("string number".includes(typeofInitValue)) {
			PTR_INTERFACE.push({
				set $(newValue: any) {
					(newValue = setterFn(newValue)).prototype == Promise_prototype
					? newValue.then(this.execWatcherFn)
					: this.execWatcherFn(newValue);

					valueHistory[valueHistoryMaxIndex = ++valueHistoryIndex] = newValue;
					actionHistory.push({ action: "set", newValue, oldValue: value })

					value = newValue;
				},
				get $(): any {
					return value
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
				},

				undo(step: number, options: { enableWatcher: true }) {
					value = valueHistory[valueHistoryIndex -= step]
					if(options.enableWatcher == true) {
						this.execWatcherFn(value);
					}
				},
				redo(step: number, options: { enableWatcher: true }) {
					value = valueHistory[++valueHistoryIndex]
					if(options.enableWatcher == true) {
						this.execWatcherFn(value);
					}
				}
			});

			if(typeofInitValue == "number") {
				PTR_INTERFACE.push({
					to(destination: number, duration: number = 1500, options: { frame: number | string, curve: { start: [number, number], end: [number, number] } }) {
						const { start: [curveStartX, curveStartY], end: [curveEndX, curveEndY] } =
							options.curve
							||= { start: [0.5, 0.5], end: [0.5, 0.5] }
						;
						const curveGeneratorFn =
							curveGenerators[`${curveStartX}-${curveStartY}-${curveEndX}-${curveEndY}`]
							||= (t: number) => [
								3 * (1 - t) * (((1 - t) * curveStartX) + (curveEndX ** 2)) + (t ** 3),
								3 * (1 - t) * (((1 - t) * curveStartY) + (curveEndY ** 2)) + (t ** 3)
							]
						;
						actionHistory.push({ action: "transit", newValue: destination, oldValue: value, curveGeneratorFn })
						if(options.frame == "animation") {

						} else {

						}
					}
				})
			}

		} else if(typeofInitValue == "symbol" && getPointer(initValue)?.[PTR_IDENTIFIER]) {

		} else if(Array_isArray(initValue)) {

		} else if(Reflect_getPrototypeOf(initValue) == Object_prototype) {
			
		}
		
		return Object_freeze(BASE_PTR)
	}
}, {
	extend(assignedConstructor: Function) {

	}
})

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

