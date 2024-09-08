import { CMD_ASSIGN_DIRECT, CMD_ASSIGN_OBJECT, CMD_ASSIGN_PTR, CMD_ASSIGN_RAW, PTR_IDENTIFIER } from './constant.ts';

export const resolveFragment = (
	[TSA, TVA, STRIX_HTML_FRAGMENT]: any[],
	FRAG_ARR: any[][]
): void => {

	FRAG_ARR.push([CMD_ASSIGN_DIRECT, TSA[0]]);

	TVA.forEach((VAL, VAL_INDEX) => {
		const CMD = (Array.isArray(VAL) && VAL[2] === STRIX_HTML_FRAGMENT)
			? CMD_ASSIGN_DIRECT
			: VAL[PTR_IDENTIFIER]
			? CMD_ASSIGN_PTR
			: typeof VAL == 'object'
			? CMD_ASSIGN_OBJECT
			: CMD_ASSIGN_RAW;

		if (CMD == CMD_ASSIGN_DIRECT) {
			resolveFragment(VAL, FRAG_ARR);
		}

		FRAG_ARR.push([CMD, TSA[VAL_INDEX + 1], VAL]);

	});
};
