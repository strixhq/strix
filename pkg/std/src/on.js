import { $ } from "jsr:@ihasq/esptr@0.1.0"

export const on = new Proxy(
	$((value, ref) => {
		Object.keys(value).forEach(eventName => ref.addEventListener(eventName, value[eventName], { passive: true }))
	}),
	{
		get: (t, prop) => $((value, ref) => {
			ref.addEventListener(prop, value, { passive: true })
		})
	}
)