/**
 * @param	{ TemplateStringsArray } s 
 * @param	{ ...any} v 
 * @returns	{ any[] }
 */

export const h = (s, ...v) => [s, v, Symbol.for("STRIX_HTML_IDENTIFIER")];