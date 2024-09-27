import { getEnv } from 'jsr:@strix/core@0.0.15'

const { STRIX_HTML_IDENTIFIER } = getEnv

type StrixHTMLFragment = [TemplateStringsArray, any[], symbol]

/**
 * @param	{ TemplateStringsArray } s
 * @param	{ ...any} v
 * @returns	{ StrixHTMLFragment }
 */

export const h = (
	s: TemplateStringsArray,
	...v: any[]
): StrixHTMLFragment => [s, v, STRIX_HTML_IDENTIFIER]
