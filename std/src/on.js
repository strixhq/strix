import { $ } from "@ihasq/esptr"

const REGISTER_FN = (prop, value, ref) => {
	return BUF_VALUE.PTR_IDENTIFIER in window
		? BUF_VALUE.watch(newValue => ref.setAttribute(prop, newValue))
		: ref.setAttribute(prop, newValue)
	;
};

export const on = new Proxy(
	{},
	{
		get: (t, prop) => (prop == Symbol.toPrimitive)
			? () => $((value, ref) => Object.keys(value).forEach(x => ref.addEventListener(x, value[x], { passive: true }))).toString()
			: $((value, ref) => ref.addEventListener(prop, value, { passive: true }))
	}
)

