import { createNode } from './create-node.ts';

export const write = (element: HTMLElement, fragment: TemplateStringsArray): HTMLElement => createNode(fragment, element, false);
