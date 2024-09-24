import { createNode } from './create-node.ts'

const { STRIX_HTML_IDENTIFIER } = getEnv

export const createElement = (fragment: TemplateStringsArray | Function): NodeList => createNode(
	typeof fragment == "function"
	? fragment()
	: fragment[2] == STRIX_HTML_IDENTIFIER
	? fragment
	: undefined,

	document.createElement('strix-unregistered'),

	true

)?.childNodes
