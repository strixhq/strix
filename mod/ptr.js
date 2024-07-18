const PUBLISHED_PTR = [];

/**
 * 
 * @param { any } value 
 * @param { object } options 
 * @returns any
 */

export const $ = (value, options) => {

	const isHeritance = PUBLISHED_PTR.includes(value);

	const BASE_SYMBOL = Symbol("STRIX_POINTER");

	const BASE_PTR = {
		toString() {
			return BASE_SYMBOL;
		}
	};

	Object.defineProperty($, BASE_PTR.toString(), {
		get() {
			options.onget();
			return isHeritance
				? $[value]
				: value
			;
		},
		set(newValue) {
			options.onset();
			return isHeritance
				? ($[value] = newValue)
				: (value = newValue)
			;
		}
	});

	PUBLISHED_PTR.push(BASE_PTR);

	return BASE_PTR;
}