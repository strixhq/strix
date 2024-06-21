import { createAttribute } from "../../mod/root.js";

const onAttr = attrGen({
	click() {

	}
});

const click = Symbol("STRIX_ATTR_INT");
const dblclick = Symbol("STRIX_ATTR_INT");
const mouseover = Symbol("STRIX_ATTR_INT");
const mouseout = Symbol("STRIX_ATTR_INT");
const mouseenter = Symbol("STRIX_ATTR_INT");
const mouseleave = Symbol("STRIX_ATTR_INT");

export const on = createAttribute({
	click(callbackFn, ref) {
		ref.addEventListener("click", callbackFn, { passive: true })
	}
})

export const ondev = {
	symbol: Symbol("STRIX_ATTR_MOD"),
	process(ref) {

	},
	toString() {
		if(this.symbol in ATTR_REGISTRY) {
			Object.keys(this).filter(x => x != ("symbol" | "process" | "toString"))
			ATTR_REGISTRY[this.symbol] = {
				
			}
		}
		return this.symbol;
	},
	click: {
		symbol: Symbol("STRIX_ATTR_ONCLICK"),
		toString() {

			if(this.symbol in ATTR_REGISTRY) {
				ATTR_REGISTRY[this.symbol] = (callbackFn, ref) => {
					ref.addEventListener("click", callbackFn, { passive: true });
				}
			}
			return this.symbol
		},
		
	}
}

const c = {
	[on]: {
		click({ t }) {
			console.log("wow")
		}
	},
	[on.click]() {

	}
}

Object.assign(targetProp, c)