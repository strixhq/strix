import { createElement } from './create-element.ts'

const STRIX_HTML_IDENTIFIER = Symbol.for("STRIX_HTML_IDENTIFIER")

export const h = (s, ...v) => {
	const fragment = {
		0: s,
		1: v,
		2: STRIX_HTML_IDENTIFIER,
		s,
		v,
		[STRIX_HTML_IDENTIFIER]: true,
		then(onloadCallbackFn) {
			Object.assign(this, { onloadCallbackFn });
			delete this.then;
			return this;
		},
		[Symbol.toPrimitive](hint) {
			return hint === STRIX_HTML_IDENTIFIER;
		}
	}
	return Object.assign((documentTarget) => {
		documentTarget.append.apply(null, createElement(fragment));
		return {
			then(onloadCallbackFn) {
				documentTarget
			}
		}
	}, fragment)
}

h`<div>${performance.now()}</div>`(document.body);