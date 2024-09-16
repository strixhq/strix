import { createNode } from './create-node.ts';

export const createBody = (fragment: TemplateStringsArray): HTMLBodyElement =>
	createNode(fragment, document.body, false) as HTMLBodyElement;
