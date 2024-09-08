import { random } from 'jsr:@ihasq/random@0.1.6';
import { resolveRootFragment } from './resolve-root-fragment.ts';
import { CMD_ASSIGN_DIRECT, CMD_ASSIGN_OBJECT, CMD_ASSIGN_PTR, CMD_ASSIGN_RAW, PTR_IDENTIFIER } from './constant.ts';

const BASE_DF = document.createDocumentFragment();

export const createNode = (fragment: TemplateStringsArray, templateElement: HTMLElement): HTMLElement => {
	const CMD_BUF = resolveRootFragment(fragment),
		BASE_TEMP = templateElement,
		PARSER_UUID = `strix-${random(32)}`,
		PARSER_TOKEN_ATTR = `${PARSER_UUID}-attr`,
		PARSER_TOKEN_PTR = `${PARSER_UUID}-ptr`;

	BASE_DF.appendChild(BASE_TEMP);
	BASE_TEMP.innerHTML = CMD_BUF
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
	BASE_TEMP.querySelectorAll(`[${PARSER_TOKEN_ATTR}],[${PARSER_TOKEN_PTR}]`).forEach((TARGET_REF) => {
		const IS_ATTR = TARGET_REF.hasAttribute(PARSER_TOKEN_ATTR),
			VAL_BUFFER = CMD_BUF[TARGET_REF.getAttribute(IS_ATTR ? PARSER_TOKEN_ATTR : PARSER_TOKEN_PTR)][2];

		if (IS_ATTR) {
			Reflect.ownKeys(VAL_BUFFER).forEach((ATTR_PROP) => {
				const ATTR_BUFFER_VALUE = VAL_BUFFER[ATTR_PROP];

				if (typeof ATTR_PROP == 'symbol') {
					window[ATTR_PROP.toString()]?.(ATTR_PROP)?.$(
						VAL_BUFFER[ATTR_PROP],
						TARGET_REF,
					);
				} else if (ATTR_BUFFER_VALUE?.[PTR_IDENTIFIER]) {
					ATTR_BUFFER_VALUE.watch((newValue) => TARGET_REF[ATTR_PROP] = newValue);
				} else {
					TARGET_REF[ATTR_PROP] = ATTR_BUFFER_VALUE;
				}
			});

			TARGET_REF.removeAttribute(PARSER_TOKEN_ATTR);
		} else {
			const TEXT_BUF = new Text();

			TARGET_REF.replaceWith(TEXT_BUF);
			VAL_BUFFER.watch((newValue) => TEXT_BUF.textContent = newValue);
		}
	});

	return BASE_TEMP;
};
