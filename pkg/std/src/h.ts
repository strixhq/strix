type StrixHTMLFragment = [TemplateStringsArray, any[], symbol]

/**
 * @param	{ TemplateStringsArray } s
 * @param	{ ...any} v
 * @returns	{ StrixHTMLFragment }
 */

export const h = (
	s: TemplateStringsArray,
	...v: any[]
): StrixHTMLFragment => [s, v, Symbol.for('STRIX_HTML_IDENTIFIER')]
