import { resolveFragment } from './resolve-fragment.ts';

export const resolveRootFragment = (fragment: TemplateStringsArray): any[] => {
	const FRAG_ARR = [];
	resolveFragment(fragment as any, FRAG_ARR);
	return FRAG_ARR;
};
