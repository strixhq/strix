export const createAttribute = (type, object) => {
	return $(0)
}

const css = createAttribute

const on = createAttribute("bundle-proxy", {
	get(prop, value, ref) {
		ref.addEventListener(prop, value, { passive: true });
	}
})