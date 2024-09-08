import { createNode } from './create-node.ts';

/**
 * @param { any[] } fragment
 * @returns { HTMLBodyElement }
 */
export const createBody = (fragment: TemplateStringsArray): HTMLBodyElement => createNode(fragment, document.createElement('body'));
