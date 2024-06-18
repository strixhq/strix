import { createAttribute, ETYPE_BUNDLE, ETYPE_INTERFACE } from "./core";

const onObj = {};

Object.keys(HTMLElement.prototype)
	.filter(x => x.startsWith("on"))
	.map(x => x.slice(2))
	.forEach(x => onObj[x] = {
		[ETYPE_INTERFACE](value, ref) {
			ref.addEventListener(x, value, { passive: true })
		}
	})

export const on = createAttribute({ [ETYPE_BUNDLE]: onObj })

const count = $(0, v => {
	document.body.textContent = v;
})

$[count]++;