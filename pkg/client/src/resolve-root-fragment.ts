import { resolveFragment } from './resolve-fragment.ts'

export const resolveRootFragment = (fragment: [TemplateStringsArray, any[], symbol]): any[] => {
	const FRAG_ARR: any[] = []
	resolveFragment(fragment, FRAG_ARR)
	return FRAG_ARR
}
