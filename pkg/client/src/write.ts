import { createNode } from './create-node.ts';

export const write = (element: HTMLElement, fragment: TemplateStringsArray): void =>
	createNode(fragment, element, false);
