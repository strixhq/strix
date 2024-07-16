export const $ = (value, options) => {

	const isHeritance = (typeof value == "symbol" && value in $)

	const BASE_SYMBOL = Symbol("STRIX_POINTER");

	Object.defineProperty($, BASE_SYMBOL, {
		get() {
			options.get();
			return isHeritance
				? $[value]
				: value;
		},
		set(newValue) {
			options.set();
			return isHeritance
				? ($[value] = newValue)
				: (value = newValue)
		}
	});

	return BASE_SYMBOL;
}