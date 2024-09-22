import { random } from 'jsr:@ihasq/random@0.1.6'
import { resolveRootFragment } from './resolve-root-fragment.ts'
import { CMD_ASSIGN_DIRECT, CMD_ASSIGN_OBJECT, CMD_ASSIGN_PTR, CMD_ASSIGN_RAW, PTR_IDENTIFIER } from './constant.ts'

const BASE_DF = document.createDocumentFragment(),
	ESC_REGEX = /["&'<>`]/g,
	ESC_CHARCODE_BUF = {},
	ESC_FN = (match): string => `&#x${ESC_CHARCODE_BUF[match] ||= match.charCodeAt(0).toString(16)};`,
	createNode = (
		fragment: [TemplateStringsArray, any[], symbol],
		BASE_TEMP: HTMLElement,
		NOT_ROOT: boolean,
	): HTMLElement | void => {
		const CMD_BUF = resolveRootFragment(fragment),
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
