import { $ } from "jsr:@ihasq/esptr@0.1.0"

export const on = new Proxy(
	{},
	{
		get: (t, prop) => prop == "toString"
			? () => $((value, ref) => Object.keys(value).forEach(x => ref.addEventListener(x, value[x], { passive: true })))
			: $((value, ref) => ref.addEventListener(prop, value, { passive: true }))
	}
)
