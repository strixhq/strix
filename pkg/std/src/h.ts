/**
 * @param	{ TemplateStringsArray } s
 * @param	{ ...any} v
 * @returns	{ any[] }
 */

export const h = (s: TemplateStringsArray, ...v: any[]): [TemplateStringsArray, any[], symbol] => [s, v, Symbol.for('STRIX_HTML_IDENTIFIER')];
