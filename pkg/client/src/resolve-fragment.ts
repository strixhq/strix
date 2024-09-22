import { CMD_ASSIGN_DIRECT, CMD_ASSIGN_OBJECT, CMD_ASSIGN_PTR, CMD_ASSIGN_RAW, PTR_IDENTIFIER } from './constant.ts'

export const resolveFragment = (
	[TSA, TVA, STRIX_HTML_FRAGMENT]: [TemplateStringsArray, any[], symbol],
	FRAG_ARR: [symbol, string, any][],
): number =>
	FRAG_ARR.push(
		[CMD_ASSIGN_DIRECT, TSA[0], undefined],
		...(TVA.map((VAL, VAL_INDEX): [symbol, string, any] => [
			(Array.isArray(VAL) && VAL[2] === STRIX_HTML_FRAGMENT)
				? (resolveFragment(VAL as [TemplateStringsArray, any[], symbol], FRAG_ARR), CMD_ASSIGN_DIRECT)
				: VAL[PTR_IDENTIFIER]
				? CMD_ASSIGN_PTR
				: typeof VAL == 'object'
				? CMD_ASSIGN_OBJECT
				: CMD_ASSIGN_RAW,
			TSA[VAL_INDEX + 1],
			VAL,
		])),
	)
;