import { createNode } from './create-node.ts';

export const createElement = (fragment: TemplateStringsArray): NodeList =>
	createNode(fragment, document.createElement('strix-unregistered')).childNodes;
