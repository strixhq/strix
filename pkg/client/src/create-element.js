import { random } from 'jsr:@ihasq/random@0.1.6';

const BASE_DF = document.createDocumentFragment(),
	PTR_IDENTIFIER = Symbol.for('PTR_IDENTIFIER'),
	CMD_ASSIGN_DIRECT = Symbol('CMD'),
	CMD_ASSIGN_OBJECT = Symbol('CMD'),
	CMD_ASSIGN_PTR = Symbol('CMD'),
	CMD_ASSIGN_RAW = Symbol('CMD');

const resolveFragment = ([TSA, TVA, STRIX_HTML_FRAGMENT], CMD_BUF) => {
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

/**
 * @param { any[] } fragment
 * @returns { NodeList }
 */

export const createElement = (fragment) => {
	const CMD_BUF = [];

	resolveFragment(fragment, CMD_BUF);

	const BASE_TEMP = document.createElement('div'),
		PARSER_UUID = `strix-${random(32)}`,
		PARSER_TOKEN_ATTR = `${PARSER_UUID}-attr`,
		PARSER_TOKEN_PTR = `${PARSER_UUID}-ptr`,
		CONCATTED_TEMPLATE = CMD_BUF
			.map(
				([CMD, TEMP_STR, TEMP_VAL], i) =>
					CMD == CMD_ASSIGN_DIRECT
						? TEMP_STR
						: CMD == CMD_ASSIGN_OBJECT
						? ` ${PARSER_TOKEN_ATTR}="${i}"${TEMP_STR}`
						: CMD == CMD_ASSIGN_PTR
						? `<${PARSER_UUID} ${PARSER_TOKEN_PTR}="${i}"></${PARSER_UUID}>${TEMP_STR}`
						: CMD == CMD_ASSIGN_RAW
						? TEMP_VAL + TEMP_STR
						: '',
			)
			.join('');

	BASE_DF.appendChild(BASE_TEMP);
	BASE_TEMP.innerHTML = CONCATTED_TEMPLATE;
	BASE_TEMP.querySelectorAll(`[${PARSER_TOKEN_ATTR}],[${PARSER_TOKEN_PTR}]`).forEach((TARGET_REF) => {
		if (TARGET_REF.hasAttribute(PARSER_TOKEN_ATTR)) {
			const ATTR_BUFFER = CMD_BUF[TARGET_REF.getAttribute(PARSER_TOKEN_ATTR)][2];

			Reflect.ownKeys(ATTR_BUFFER).forEach((ATTR_INDEX) => {
				const ATTR_BUFFER_VALUE = ATTR_BUFFER[ATTR_INDEX];

				if (typeof ATTR_INDEX == 'symbol') {
					window[ATTR_INDEX.toString()]?.(ATTR_INDEX)?.$(
						ATTR_BUFFER[ATTR_INDEX],
						TARGET_REF,
					);
				} else if (ATTR_BUFFER_VALUE?.[PTR_IDENTIFIER]) {
					ATTR_BUFFER_VALUE.watch((newValue) => TARGET_REF[ATTR_INDEX] = newValue);
				} else {
					TARGET_REF[ATTR_INDEX] = ATTR_BUFFER_VALUE;
				}
			});

			TARGET_REF.removeAttribute(PARSER_TOKEN_ATTR);
		} else {
			const PTR_BUFFER = CMD_BUF[TARGET_REF.getAttribute(PARSER_TOKEN_PTR)][2],
				TEXT_BUF = new Text();

			TARGET_REF.replaceWith(TEXT_BUF);
			PTR_BUFFER.watch((newValue) => TEXT_BUF.textContent = newValue);
		}
	});

	return BASE_TEMP.childNodes;
};
