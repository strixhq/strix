import { $ } from "jsr:@ihasq/esptr@0.1.0"

export const at = new Proxy(
	$((value, ref) => {
		Object.keys(value).forEach(attrName => {
			if(typeof value == "symbol" && value in window) {
				value.watch((newValue) => ref.setAttribute(attrName, newValue))
				ref.setAttribute(attrName, $[value])
			} else {
				ref.setAttribute(attrName, value)
			}
		})
	}),
	{
		get: (t, prop) => $((value, ref) => {
			ref.setAttribute(prop, value)
		})
	}
)