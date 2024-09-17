import { random } from 'jsr:@ihasq/random@0.1.6';
import { resolveRootFragment } from './resolve-root-fragment.ts';
import { CMD_ASSIGN_DIRECT, CMD_ASSIGN_OBJECT, CMD_ASSIGN_PTR, CMD_ASSIGN_RAW, PTR_IDENTIFIER } from './constant.ts';

const BASE_DF = document.createDocumentFragment(),
	ESCAPER_TEMP = {
		'"': 22,
		'&': 26,
		"'": 27,
		'<': '3C',
		'>': '3E',
		'`': 60,
	},
	ESCAPER_REGEX = /[&'`"<>]/g,
	ESCAPER_FN = (match): string => "&#x" + ESCAPER_TEMP[match],
	PUBLISH_ATTR_TOKEN = (CMD_INDEX: number, PUBLISHED_ATTR_TOKEN: object, PARSER_TOKEN_ATTR: string): string => {
		const TOKEN_BUF = `${PARSER_UUID}-${CMD_INDEX}`;
		if(!Array.isArray(PUBLISHED_ATTR_TOKEN[PUBLISHED_ATTR_TOKEN])) {
			PARSER_TOKEN_ATTR[PUBLISHED_ATTR_TOKEN] = []
		}
		PARSER_TOKEN_ATTR[PUBLISHED_ATTR_TOKEN].push(TOKEN_BUF)
		return TOKEN_BUF;
	},
	REGISTER_ATTR_INDEX = (CMD_INDEX: number, REGISTERED_ATTR_INDEX: number[]) => {
		REGISTERED_ATTR_INDEX.push(CMD_INDEX)
	},
	createNode = (fragment: [TemplateStringsArray, any[], symbol], BASE_TEMP: HTMLElement, NOT_ROOT: boolean): HTMLElement | void => {
		const
			CMD_BUF = resolveRootFragment(fragment),
			PARSER_UUID = `strix-${random(32)}`,
			PARSER_TOKEN_ATTR = `${PARSER_UUID}-attr`,
			PARSER_TOKEN_PTR = `${PARSER_UUID}-ptr`,
			PUBLISHED_ATTR_TOKEN = {},
			REGISTERED_ATTR_INDEX: number[] = [];

		if (NOT_ROOT) {
			BASE_DF.appendChild(BASE_TEMP);
		}

		BASE_TEMP.innerHTML = CMD_BUF
			.map(
				([CMD, TEMP_STR, TEMP_VAL], CMD_INDEX) =>
					CMD == CMD_ASSIGN_DIRECT
						? TEMP_STR
						: CMD == CMD_ASSIGN_OBJECT
						? ` ${PARSER_UUID}="attr" ${PARSER_UUID}-attr-${CMD_INDEX}="${CMD_INDEX}"${TEMP_STR}`
						: CMD == CMD_ASSIGN_PTR
						? `<template ${PARSER_UUID}="ptr" ${PARSER_TOKEN_PTR}="${CMD_INDEX}"></template>${TEMP_STR}`
						: CMD == CMD_ASSIGN_RAW
						? (TEMP_VAL + '').replace(ESCAPER_REGEX, ESCAPER_FN) + TEMP_STR
						: '',
			)
			.join('');
		BASE_TEMP.querySelectorAll(`[${PARSER_UUID}]`).forEach((TARGET_REF) => {
			console.log(TARGET_REF)
			const ATTR_TYPE = TARGET_REF.getAttribute(PARSER_UUID);
			switch(ATTR_TYPE) {
				case "attr": {
					Array.from(TARGET_REF.attributes).forEach(({ name }) => {
						if(!name.startsWith(PARSER_TOKEN_ATTR)) return;

						const VAL_BUFFER = CMD_BUF[TARGET_REF.getAttribute(name)][2];
						Reflect.ownKeys(VAL_BUFFER).forEach((ATTR_PROP) => {
							const ATTR_BUFFER_VALUE = VAL_BUFFER[ATTR_PROP];
			
							if (typeof ATTR_PROP == 'symbol') {
								window[ATTR_PROP.toString()]?.(ATTR_PROP)?.$(
									VAL_BUFFER[ATTR_PROP],
									TARGET_REF,
									NOT_ROOT ? undefined : BASE_TEMP,
								);
							} else if (ATTR_BUFFER_VALUE?.[PTR_IDENTIFIER]) {
								ATTR_BUFFER_VALUE.watch((newValue) => TARGET_REF[ATTR_PROP] = newValue);
							} else {
								TARGET_REF[ATTR_PROP] = ATTR_BUFFER_VALUE;
							}
						});
					});
					TARGET_REF.removeAttribute(PARSER_UUID)
					break;
				}
				case "ptr": {
					const VAL_BUFFER = CMD_BUF[TARGET_REF.getAttribute(PARSER_TOKEN_PTR)][2]
					const TEXT_BUF = new Text();
		
					TARGET_REF.replaceWith(TEXT_BUF);
					VAL_BUFFER.watch((newValue) => TEXT_BUF.textContent = newValue + '');

					break;
				}
			}
		});

		return NOT_ROOT ? BASE_TEMP : undefined;
	};

export { createNode };
