const PUBLISHED_SYMBOLS = {};

const PTYPE_ORIGINAL = Symbol("PTYPE");
const PTYPE_EXTENDED = Symbol("PTYPE");

export const $ = (value, options) => {

	const {

		get: OPTION_GET,
		set: OPTION_SET,
		dispose: OPTION_DISPOSE

	} = options,

		BASE_SYMBOL = Symbol("STRIX_POINTER"),

		POINTER_TYPE = (typeof value == "symbol" && value in PUBLISHED_SYMBOLS)
			? PTYPE_EXTENDED
			: PTYPE_ORIGINAL;

	PUBLISHED_SYMBOLS[BASE_SYMBOL] = {

		type: POINTER_TYPE,

		parent: POINTER_TYPE == PTYPE_EXTENDED
			? PUBLISHED_SYMBOLS[value].parent
			: value,

		value: POINTER_TYPE == PTYPE_EXTENDED
			? PUBLISHED_SYMBOLS[value].value
			: value,
		
		setter(value) {
			return;
		}
	}

	Object.defineProperty($, BASE_SYMBOL, {

		get() {
			OPTION_GET?.();
			return PUBLISHED_SYMBOLS[BASE_SYMBOL].value;
		},

		set(ARG_NEW_VALUE) {
			PUBLISHED_SYMBOLS[BASE_SYMBOL].setter();
			return value = OPTION_SET?.(ARG_NEW_VALUE);
		}
	})

	return ({

		toString() {
			return BASE_SYMBOL;
		},

		on(eventCallbacks) {
			return PUBLISHED_SYMBOLS[BASE_SYMBOL]?.assignEventCallbacks?.(eventCallbacks);
		},

		[Symbol.dispose]() {
			return PUBLISHED_SYMBOLS[BASE_SYMBOL]?.value[Symbol.dispose]();
		}
	})
}
