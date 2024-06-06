/**
 * 
 * @param { number } i
 * @returns { (a: TemplateStringsArray, ...b: any[]) => (j: number) => (TemplateStringsArray | any[]) }
 */

export const tmp = i => (a, ...b) => j => i ^ j ? a : b;
