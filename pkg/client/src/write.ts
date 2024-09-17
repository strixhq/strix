import { createNode } from './create-node.ts';
import { PTR_IDENTIFIER } from './constant.ts';

export const write = (element: HTMLElement, fragment: [TemplateStringsArray, any[], symbol]): void =>
	fragment[2] == PTR_IDENTIFIER ? createNode(fragment, element, false) : undefined;
