const PUBLISHED_SYMBOLS = {};

const PTYPE_ORIGINAL = Symbol("PTYPE");
const PTYPE_EXTENDED = Symbol("PTYPE");

export const $ = (value, options) => {

	const {

		get: OPTION_GET,
		set: OPTION_SET

	} = options,

		BASE_SYMBOL = Symbol("STRIX_POINTER")
	;

	if(typeof value == "symbol" && value in PUBLISHED_SYMBOLS) {
		return undefined;
	}

	PUBLISHED_SYMBOLS[BASE_SYMBOL] = {
		value,
		onchangeListenerAddressCollection: {},
		onchangeListener: [],
		addOnchange(callbackFn) {
			
			this.setterCollection[callbackSymbol] = callbackFn;
		}
	}

	PUBLISHED_SYMBOLS[BASE_SYMBOL]

	Object.defineProperty($, BASE_SYMBOL, {

		get() {
			OPTION_GET?.();
			return PUBLISHED_SYMBOLS[BASE_SYMBOL].value;
		},

		set(ARG_NEW_VALUE) {
			PUBLISHED_SYMBOLS[BASE_SYMBOL].onchangeListener.forEach(x => x(ARG_NEW_VALUE));
			return value = OPTION_SET?.(ARG_NEW_VALUE) || ARG_NEW_VALUE;
		},

		configurable: false,
	})

	return ({

		toString() {
			return BASE_SYMBOL;
		},

		addOnchangeListener(eventCallback) {
			const callbackSymbol = Symbol("STRIX_ONCHANGE");
			PUBLISHED_SYMBOLS[BASE_SYMBOL]?.setterCollection[callbackSymbol] = eventCallback;
			return callbackSymbol;
		},

		removeOnchangeListener(callbackSymbol) {
			delete PUBLISHED_SYMBOLS[BASE_SYMBOL]?.setterCollection[callbackSymbol];
		}
	})
};
