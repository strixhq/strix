import { $ } from "@ihasq/esptr"

const REGISTER_FN = (prop, value, ref) => {
	return window[value.PTR_IDENTIFIER]
		? value.watch(newValue => ref.setAttribute(prop, newValue))
		: ref.setAttribute(prop, value)
	;
};

export const at = new Proxy(
	{},
	{
		get: (_, PROXY_PROP) => PROXY_PROP == "toString"
			// value is an object
			// [at]: { type: "input" } --> (PROXY_PROP: "toString", value: { type: "input" })
			? () => $((value, ref) => Object.keys(value).forEach(VALUE_PROP => REGISTER_FN(VALUE_PROP, value[VALUE_PROP], ref)))

			// value is a primitive
			// [at.type]: "input" --> (PROXY_PROP: "type", value: "input")
			: $((value, ref) => REGISTER_FN(PROXY_PROP, value, ref))
	}
)