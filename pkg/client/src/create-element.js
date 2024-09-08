import { createNode } from './create-node.js';

/**
 * @param { any[] } fragment
 * @returns { NodeList }
 */
export const createElement = (fragment) => createNode(fragment, document.createElement('div')).childNodes;
