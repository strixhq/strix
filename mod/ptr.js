const PUBLISHED_PTR = [];

/**
 * 
 * @param { any } value 
 * @param { object } options 
 * @returns any
 */

export const $ = (value, setterFn = newValue => newValue) => {

	const isHeritance = PUBLISHED_PTR.includes(value);

	const BASE_SYMBOL = Symbol("STRIX_POINTER");

	const callbacks = {
		set: []
	}

	Object.defineProperty($, BASE_SYMBOL, {
		get() {
			return isHeritance
				? $[value]
				: value
			;
		},
		set(newValue) {
			callbacks.set.forEach(x => x(newValue));
			return isHeritance
				? ($[value] = setterFn(newValue))
				: (value = setterFn(newValue))
			;
		},
		enumerable: false
	});

	PUBLISHED_PTR.push(BASE_SYMBOL);

	return {
		toString() {
			return BASE_SYMBOL;
		},
		on(eventName, callbackFn) {
			callbacks[eventName].push(callbackFn);
		}
	}
}