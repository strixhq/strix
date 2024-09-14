import { createNode } from './create-node.ts';

export const createBody = (fragment: TemplateStringsArray): HTMLBodyElement =>
	createNode(fragment, document.createElement('body'), true) as HTMLBodyElement;
