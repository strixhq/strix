const PUBLISHED_SYMBOLS = {};

const PTYPE_ORIGINAL = Symbol("PTYPE");
const PTYPE_EXTENDED = Symbol("PTYPE");

let bind_buffer,
	is_gonnabe_init = false;

const initializerProxy = new Proxy({}, {

	get(_, prop) {

		if(is_gonnabe_init) {

			is_gonnabe_init = false;

			let { value } = bind_buffer;

			const {
				options: {
					get: OPTION_GET,
					set: OPTION_SET,
					dispose: OPTION_DISPOSE
				}
			} = bind_buffer,

				SYMBOL_BUFFER = Symbol("STRIX_POINTER"),

				POINTER_TYPE = (typeof value == "symbol" && value in PUBLISHED_SYMBOLS)
					? PTYPE_EXTENDED
					: PTYPE_ORIGINAL;

			PUBLISHED_SYMBOLS[SYMBOL_BUFFER] = {
				type: POINTER_TYPE,
				parent: POINTER_TYPE == PTYPE_EXTENDED
					? value
					: undefined,
				value: POINTER_TYPE == PTYPE_EXTENDED
					? PUBLISHED_SYMBOLS[value].value
					: value
			}

			Object.defineProperty($, SYMBOL_BUFFER, {

				get() {
					OPTION_GET?.();
					return value;
				},

				set(newValue) {
					return value = OPTION_SET?.(newValue);
				}
			})

			return ({

				toString() {
					return SYMBOL_BUFFER;
				},

				get name() {
					return prop;
				},

				[Symbol.dispose]() {
					return OPTION_DISPOSE?.();
				}
			})
		} else {

			return undefined;
		}
	}
})

export const $ = async (value, options) => {

	Object.assign(bind_buffer, { value, options });

	is_gonnabe_init = true;

	return initializerProxy;
}