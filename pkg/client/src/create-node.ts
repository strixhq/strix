import { random } from 'jsr:@ihasq/random@0.1.6'
import { getEnv } from 'jsr:@strix/core@0.0.5'

const { CMD_ASSIGN_DIRECT, CMD_ASSIGN_OBJECT, CMD_ASSIGN_PTR, CMD_ASSIGN_RAW, PTR_IDENTIFIER } = getEnv,
	BASE_DF = document.createDocumentFragment(),
	ESC_REGEX = /["&'<>`]/g,
	ESC_CHARCODE_BUF = {},
	ESC_FN = (match): string => `&#x${ESC_CHARCODE_BUF[match] ||= match.charCodeAt(0).toString(16)};`,
	resolveFragment = (
		[TSA, TVA, STRIX_HTML_FRAGMENT]: [TemplateStringsArray, any[], symbol],
		FRAG_ARR: [symbol, string, any][] = [],
	): [symbol, string, any][] => {
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
		return FRAG_ARR
	},
	// export
	createNode = (
		fragment: [TemplateStringsArray, any[], symbol],
		BASE_TEMP: HTMLElement,
		NOT_ROOT: boolean,
	): HTMLElement | void => {
		const CMD_BUF = resolveFragment(fragment),
			PARSER_UUID = `strix-${random(32)}`,
			ATTR_PARSER_TOKEN = `${PARSER_UUID}-attr`,
			PTR_PARSER_TOKEN = `${PARSER_UUID}-ptr`

		if (NOT_ROOT) {
			BASE_DF.appendChild(BASE_TEMP)
		}

		BASE_TEMP.innerHTML = CMD_BUF
			.map(
				([CMD, TEMP_STR, TEMP_VAL], CMD_INDEX) =>
					CMD == CMD_ASSIGN_DIRECT
						? TEMP_STR
						: CMD == CMD_ASSIGN_OBJECT
						? ` ${PARSER_UUID}="attr" ${ATTR_PARSER_TOKEN}-${CMD_INDEX}="${CMD_INDEX}"${TEMP_STR}`
						: CMD == CMD_ASSIGN_PTR
						? `<template ${PARSER_UUID}="ptr" ${PTR_PARSER_TOKEN}="${CMD_INDEX}"></template>${TEMP_STR}`
						: CMD == CMD_ASSIGN_RAW
						? (TEMP_VAL + '').replace(ESC_REGEX, ESC_FN) + TEMP_STR
						: '',
			)
			.join('')

		BASE_TEMP
			.querySelectorAll(`[${PARSER_UUID}]`)
			.forEach((TARGET_REF) => {
				switch (TARGET_REF.getAttribute(PARSER_UUID)) {
					case 'attr': {
						Array.from(TARGET_REF.attributes).forEach(({ name, value }) => {
							if (!name.startsWith(ATTR_PARSER_TOKEN)) return

							const VAL_BUFFER = CMD_BUF[value][2]
							Reflect.ownKeys(VAL_BUFFER).forEach((ATTR_PROP) => {
								const ATTR_BUFFER_VALUE = VAL_BUFFER[ATTR_PROP]

								if (typeof ATTR_PROP == 'symbol') {
									window[ATTR_PROP.toString()]?.(ATTR_PROP)?.$(
										VAL_BUFFER[ATTR_PROP],
										TARGET_REF,
										NOT_ROOT ? undefined : BASE_TEMP,
									)
								} else if (ATTR_BUFFER_VALUE?.[PTR_IDENTIFIER]) {
									ATTR_BUFFER_VALUE.watch((newValue) => TARGET_REF[ATTR_PROP] = newValue)
								} else {
									TARGET_REF[ATTR_PROP] = ATTR_BUFFER_VALUE
								}
							})

							queueMicrotask(() => TARGET_REF.removeAttribute(name))
						})
						queueMicrotask(() => TARGET_REF.removeAttribute(PARSER_UUID))
						return
					}
					case 'ptr': {
						const VAL_BUFFER = CMD_BUF[TARGET_REF.getAttribute(PTR_PARSER_TOKEN)][2],
							TEXT_BUF = new Text()

						TARGET_REF.replaceWith(TEXT_BUF)
						VAL_BUFFER.watch((newValue) => TEXT_BUF.textContent = newValue + '')
					}
				}
			})

		return NOT_ROOT ? BASE_TEMP : undefined
	}

export { createNode }
