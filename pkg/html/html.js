/**
 * @typedef {{ 0: string[], 1: Array }} StrixHTMLTemplate
 * 
 * @type { Function }
 * 
 * @param { TemplateStringsArray } param0 
 * @param  {...any} val 
 * @returns { StrixHTMLTemplate }
 */

export const h = ({ raw }, ...val) => ({ 0: raw, 1: val });