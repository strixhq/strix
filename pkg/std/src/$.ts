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

const PUBLISHED_PTR = {},
	GLOBAL_TOKEN = ((TOKEN_BUF) => {
		while ((TOKEN_BUF = random(16)) in globalThis) {}
		return TOKEN_BUF
	})(),
	createSymbol = (name) => Symbol(GLOBAL_TOKEN + name),
	SETTER_STD = (
		newValue: undefined,
		watcherFnList: Function[],
		// setData: object = {},
	) => {
		watcherFnList.forEach((watcherFn) => watcherFn(newValue))
		return newValue
	},
	curveGenerators = {}
;

Object.defineProperty(globalThis, GLOBAL_TOKEN, {
	configurable: false,
	enumerable: false,
	value: Object_freeze(Object_assign((symbol: symbol) => PUBLISHED_PTR[symbol], {
		has: (symbol: symbol) => symbol in PUBLISHED_PTR,
	})),
})

type $<T> = T;

// interface StrixPointer {
// 	[Symbol_toPrimitive]: (hint: string) => symbol | number;
// 	publishSymbol: () => symbol;
// 	watchers: Function[];
// 	$?: any;
// 	watch?: (...watcherFnList) => 
// }

const next$: Function = Object_assign((...args: any[]): symbol | undefined => {
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
		const [initValue, setterFn = (newValue: any) => newValue, options = { name: '', watcherFnList: [], reload: true }] = args,
			typeofInitValue = typeof initValue,
			BASE_SYMBOL = createSymbol(options.name),
			BASE_PTR: object = {
				[PTR_IDENTIFIER]: true,
				[Symbol_toPrimitive](hint) {
					return hint == "number" && typeofInitValue == "number"
						? initValue
						: BASE_SYMBOL
				},
				publishSymbol() {
					const NEW_SYMBOL = createSymbol(options.name);
					PUBLISHED_PTR[NEW_SYMBOL] = this;
					return NEW_SYMBOL
				},
				watchers: [],
				execWatcherFn(newValue) {
					this.watchers.forEach(watcher => watcher(newValue))
				}
			},
			IS_INITVALUE_PTR: boolean = Object_isFrozen(initValue) && initValue[PTR_IDENTIFIER], 

			PTR_INTERFACE: object[] = [{
				[PTR_IDENTIFIER]: true,
				[Symbol_toPrimitive](hint) {
					if(hint == STRIX_PUBLISH_NEW_SYMBOL) {
						const NEW_SYMBOL = createSymbol(options.name);
						PUBLISHED_PTR[NEW_SYMBOL] = this;
						return NEW_SYMBOL;
					}
					return hint == "number" && hint == typeofInitValue
						? initValue
						: BASE_SYMBOL
				},
				publishSymbol() {
					const NEW_SYMBOL = createSymbol(options.name);
					PUBLISHED_PTR[NEW_SYMBOL] = this;
					return NEW_SYMBOL
				},
			}],
	
			valueHistory: any[] = [],
			actionHistory: {
				action: string,
				oldValue?: any, newValue?: any, curveGeneratorFn?: Function,
				targetIndex?: number
			}[] = [],
			createAction = (action: string, oldValue: any, newValue: any) => ({ action, oldValue, newValue }),

			watcherFnList: Function[] = [],
			execWatcherFn = (newValue: any): any => {
				watcherFnList.forEach(watcherFn => watcherFn(newValue))
				return newValue
			}
		;

		let
			value = initValue,
			valueHistoryIndex = 0,
			valueHistoryMaxIndex = 0,

			actionHistoryIndex = -1
		;

		valueHistory.push(value);

		if(typeofInitValue == "symbol") {

			return getPointer(initValue)

		} else if("string number".includes(typeofInitValue)) {

			actionHistory[++actionHistoryIndex] = {
				action: "init-primitive",
				oldValue: undefined, newValue: initValue
			}

			PTR_INTERFACE.push({
				set $(newValue: any) {
					if((newValue = setterFn(newValue)).prototype == Promise_prototype) {
						newValue.then((resolvedNewValue) => {
							if(resolvedNewValue === value) return;
							actionHistory[++actionHistoryIndex] = createAction("set", value, execWatcherFn(value = resolvedNewValue));
						})
					} else {
						if(newValue === value) return;
						actionHistory[++actionHistoryIndex] = createAction("set", value, execWatcherFn(value = newValue))
					}
					valueHistory[valueHistoryMaxIndex = ++valueHistoryIndex] = newValue;
				},
				get $(): any {
					return value
				},
				watch(...newWatcherFnList: Function[]): object {
					if(newWatcherFnList.length) {
						newWatcherFnList.forEach(watcherFn => watcherFn(value))
						watcherFnList.push.apply(null, newWatcherFnList)
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

				undo(step: number, options: { ignoreWatcher: boolean }) {
					value = valueHistory[valueHistoryIndex -= step]
					if(options.ignoreWatcher == true) {
						this.execWatcherFn(value);
					}
				},
				redo(step: number, options: { ignoreWatcher: boolean }) {
					value = valueHistory[++valueHistoryIndex]
					if(options.ignoreWatcher == true) {
						this.execWatcherFn(value);
					}
				}
			});

			if(typeofInitValue == "number") {
				PTR_INTERFACE.push({
					to(
						destination: number, duration: number = 1500,
						options: {
							frame: number | string,
							curve: {
								start: [number, number],
								end: [number, number]
							}
						}
					) {
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
							const EXEC_TIMESTAMP = performance.now();
							const clockFn = () => {
								const CLOCK_TIMESTAMP = performance.now()
								const CLOCK_DURATION = (CLOCK_TIMESTAMP - EXEC_TIMESTAMP);
								if(CLOCK_DURATION < duration) {
									curveGeneratorFn(CLOCK_DURATION / duration);
									requestAnimationFrame(clockFn);
								}
							}
							requestAnimationFrame(clockFn);
						} else {

						}
					}
				})
			}

		} else {
			actionHistory.push({ action: "init-object", oldValue: undefined, newValue: initValue })
			if(Array_isArray(initValue)) {

			} else if(Reflect_getPrototypeOf(initValue) == Object_prototype) {
				
			}
		}

		return Object_freeze(BASE_PTR);
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
