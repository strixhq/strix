import { $ } from "@strix/std"

export const on = new Proxy(
	$((value, { ref }) => Object.keys(value).forEach(x => ref.addEventListener(x, e => $[value][x](e), { passive: true }))),
	{ get: (_, prop) => $((value, { ref }) => ref.addEventListener(prop, e => $[value](e), { passive: true })) }
)