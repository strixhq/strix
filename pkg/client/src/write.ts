import { createNode } from './create-node.ts';

export const write = (element: HTMLElement, fragment: TemplateStringsArray) => createNode(fragment, element, false);
