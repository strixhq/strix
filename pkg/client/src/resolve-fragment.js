const CMD_ASSIGN_DIRECT = Symbol('CMD'),
	CMD_ASSIGN_OBJECT = Symbol('CMD'),
	CMD_ASSIGN_PTR = Symbol('CMD'),
	CMD_ASSIGN_RAW = Symbol('CMD');

export const resolveFragment = ([TSA, TVA, STRIX_HTML_FRAGMENT], CMD_BUF) => {
	CMD_BUF.push([CMD_ASSIGN_DIRECT, TSA[0]]);

	TVA.forEach((VAL, VAL_INDEX) => {
		const CMD = (Array.isArray(VAL) && VAL[2] === STRIX_HTML_FRAGMENT)
			? CMD_ASSIGN_DIRECT
			: VAL[PTR_IDENTIFIER]
			? CMD_ASSIGN_PTR
			: typeof VAL == 'object'
			? CMD_ASSIGN_OBJECT
			: CMD_ASSIGN_RAW;

		if (CMD == CMD_ASSIGN_DIRECT) {
			resolveFragment(VAL, CMD_BUF);
		}

		CMD_BUF.push([CMD, TSA[VAL_INDEX + 1], VAL]);
	});
};