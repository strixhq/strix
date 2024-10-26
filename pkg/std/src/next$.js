import { getAddress, getEnv, getPointer, getRandom as random, getStatic } from 'jsr:@strix/core@0.0.19'

const {
	Object_isFrozen, Object_assign, Object_freeze,

	Array_isArray,
	Reflect_getPrototypeOf,

	Promise_prototype, Object_prototype, Function_prototype,

	Symbol_toPrimitive
} = getStatic

const isTemp = (arg) =>
	Array_isArray(firstArg) &&
	Object_isFrozen(firstArg) &&
	'raw' in firstArg &&
	Array_isArray(firstArg.raw) &&
	Object_isFrozen(firstArg.raw)
;

const $ = Object_assign((...args) => {
	if (isTemp(args)) {
		// called as template
		const [s, ...v] = args
		v.forEach((vIndex) => {
			if (typeof vIndex == 'symbol') {
				const ptr = getPointer(vIndex)
				if (!ptr) return
			}
		})
	} else {
		const [initValue, setterFn = (newValue) => newValue, { name = '', newWatcherFnList = [], reload = true }] = args;
		const typeofInitValue = typeof initValue;

		if ("undefined null bigint".includes(typeofInitValue)) return;

		const
			BASE_SYMBOL = createSymbol(name),
			IS_INITVALUE_PTR = Object_isFrozen(initValue) && initValue[PTR_IDENTIFIER], 

			PTR_INTERFACE = [{
				[PTR_IDENTIFIER]: true,

				/**
				 * 
				 * @param { string | STRIX_PUBLISH_NEW_SYMBOL } hint
				 * @returns { string | symbol | number }
				 */
				[Symbol_toPrimitive](hint) {
					if(hint !== STRIX_PUBLISH_NEW_SYMBOL)
						return hint == "number" && hint == typeofInitValue
							? initValue
							: hint == PTR_IDENTIFIER
							? true
							: BASE_SYMBOL
					;
					const NEW_SYMBOL = createSymbol(options.name);
					PUBLISHED_PTR[NEW_SYMBOL] = this;
					return NEW_SYMBOL;
				}
			}],
	
			valueHistory = [],
			actionHistory/**: {
				action,
				oldValue, newValue, curveGeneratorFn?: Function,
				targetIndex?: number
			}[]*/ = [],

			watcherFnList = [],
			execWatcherFn = (target, newValue) => {
				if(!globalWatcherStore.has(target)) return newValue;
				globalWatcherStore.get(target).forEach(watcherFn => watcherFn(newValue))
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

			actionHistory[++actionHistoryIndex] = createAction("init-primitive", undefined, initValue);

			PTR_INTERFACE.push({
				set $(newValue) {
					if((newValue = setterFn(newValue)).prototype == Promise_prototype) {
						newValue.then((resolvedNewValue) => {
							if(resolvedNewValue === value) return;
							actionHistory[++actionHistoryIndex] = createAction("set", value, execWatcherFn(this, value = resolvedNewValue));
						})
					} else {
						if(newValue === value) return;
						actionHistory[++actionHistoryIndex] = createAction("set", value, execWatcherFn(this, value = newValue))
					}
					valueHistory[valueHistoryMaxIndex = ++valueHistoryIndex] = newValue;
				},
				get $() {
					return value
				},

				/**
				 * 
				 * @param  { ...Function } newWatcherFnList 
				 * @returns { this }
				 */
				watch(...newWatcherFnList) {
					if(globalWatcherStore.has(this)) {
						globalWatcherStore.set(this, []);
					};
					if(newWatcherFnList.length) {
						newWatcherFnList.forEach(watcherFn => watcherFn(value))
						globalWatcherStore.get(this).push.apply(null, newWatcherFnList)
					}
					return this;
				},

				/**
				 * 
				 * @param  { ...Function } newTransformerFnList 
				 * @returns { object | this }
				 */
				into(...newTransformerFnList) {
					const asyncBuf = new WeakMap();
					return newTransformerFnList.length
						? $(this, (newValue) => {
							for(const transformerFn of newTransformerFnList) {
								newValue = transformerFn(newValue)
							}
							return newValue
						})
						: this
				},

				undo(step, { ignoreWatcher = true }) {
					value = valueHistory[valueHistoryIndex -= step]
					if(options.ignoreWatcher == true) {
						this.execWatcherFn(value);
					}
					return this
				},

				redo(step, { ignoreWatcher = true }) {
					value = valueHistory[++valueHistoryIndex]
					if(options.ignoreWatcher == true) {
						this.execWatcherFn(value);
					}
					return this
				}
			});

			if(typeofInitValue == "number") {
				PTR_INTERFACE.push({
					to(
						destination,
						duration = 1500,
						{
							frame,
							curve: {
								start,
								end
							}
						}
					) {
						const { start: [curveStartX, curveStartY], end: [curveEndX, curveEndY] } =
							options.curve
							||= { start: [0.5, 0.5], end: [0.5, 0.5] }
						;
						const curveGeneratorFn =
							curveGenerators[`${curveStartX}-${curveStartY}-${curveEndX}-${curveEndY}`]
							||= (t) => [
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

		} else if(typeofInitValue == "object") {
			actionHistory.push({ action: "init-object", oldValue: undefined, newValue: initValue })
			if(Array_isArray(initValue)) {
				return new Proxy(initValue, {
					get(target, prop) {
						return prop in arrayActionList
							? arrayActionList[prop].bind(target)
							: target[prop]
					},
					set(target, newValue, prop) {
						initValue[prop] = newValue
					}
				})
			} else if(Reflect_getPrototypeOf(initValue) == Object_prototype) {
				
			}
		}

		return Object_freeze(BASE_PTR);
	}
}, {
	extend(assignedConstructor) {

	}
})