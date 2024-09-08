import { resolveFragment } from './resolve-fragment.js';

export const resolveRootFragment = (fragment) => {
	const FRAG_ARR = [];
	resolveFragment(fragment, FRAG_ARR);
	return FRAG_ARR;
};
