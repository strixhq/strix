import { getEnv } from 'jsr:@strix/core@0.0.15'

const { STRIX_HTML_IDENTIFIER } = getEnv

/**
 * @param	{ TemplateStringsArray } s
 * @param	{ ...any} v
 * @returns	{ StrixHTMLFragment }
 */

export const h = (s, ...v) => ({
	0: s,
	1: v,
	2: STRIX_HTML_IDENTIFIER,
	s,
	v,
	[STRIX_HTML_IDENTIFIER]: true,
	then(onloadCallbackFn) {

		return this;
	}
})