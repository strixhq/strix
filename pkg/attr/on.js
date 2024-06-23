import { $ } from "@strix/std"

export const on = Object.assign(
	$((value, { ref }) => {
		Object.keys(value).forEach(x => ref.addEventListener(x, e => $[value][x](e), { passive: true }))
	}),
	{
		click: $((value, { ref }) => ref.addEventListener("click", e => $[value](e), { passive: true })),
		dblclick: $((value, { ref }) => ref.addEventListener("dblclick", e => $[value](e), { passive: true })),
	}
);