import { random } from 'jsr:@ihasq/random@0.1.6'
import { PTR_IDENTIFIER } from "./env.ts"


const BASE_DF = document.createDocumentFragment(),

	ESC_REGEX = /["&'<>`]/g,
	ESC_CHARCODE_BUF = {},
	ESC_FN = (match): string => `&#x${ESC_CHARCODE_BUF[match] ||= match.charCodeAt(0).toString(16)};`,

	OBJ_PROTO = Reflect.getPrototypeOf({}),

	resolveFragment = (
		[TSA, TVA, STRIX_HTML_FRAGMENT]: [TemplateStringsArray, any[], symbol],
		FRAG_ARR: [number, string, any][] = [],
	): [number, string, any][] => {
		FRAG_ARR.push(
			[0, TSA[0], undefined],
			...(TVA.map((VAL, VAL_INDEX): [number, string, any] => [
				(Array.isArray(VAL) && VAL[2] === STRIX_HTML_FRAGMENT)
					? (
						resolveFragment(VAL as [TemplateStringsArray, any[], symbol], FRAG_ARR),
						0
					)
					: VAL[PTR_IDENTIFIER]
					? 1
					: typeof VAL == 'object'
					? 2
					: 3,
				TSA[VAL_INDEX + 1],
				VAL,
			])),
		)
		return FRAG_ARR
	},

	resolveAttrIndex = (RAW_ATTR, TARGET_REF) => {

		Reflect.ownKeys(RAW_ATTR).forEach(RAW_ATTR_KEY => {

			if(typeof RAW_ATTR_KEY == 'symbol') {
				
				const PTR_BUF = window[RAW_ATTR_KEY.toString()]?.(RAW_ATTR_KEY);
				if(!PTR_BUF[PTR_IDENTIFIER]) return;
				
				const ATTR_PROCESSOR_FN = PTR_BUF.$;
				if(ATTR_PROCESSOR_FN.constructor?.name != "Function") return;
				
				const RETURNED_ATTR_BUF = ATTR_PROCESSOR_FN(
					RAW_ATTR[RAW_ATTR_KEY],
					TARGET_REF,
				)

				if(typeof RETURNED_ATTR_BUF != "object" || Reflect.getPrototypeOf(RETURNED_ATTR_BUF) !== OBJ_PROTO) return;

				resolveAttrIndex(RETURNED_ATTR_BUF, TARGET_REF);
			}
		})
	},

	resolveAttr = (TARGET_REF, ATTR_PARSER_TOKEN, VAL_BUFFER, CMD_BUF, ATTR_HOLDER_PROXY) => {

		const ATTR_BUF = {};

		Array.from(TARGET_REF.attributes).reverse().forEach(({ name: ATTR_NAME, value: ATTR_VAL }) => {

			if (!ATTR_NAME.startsWith(ATTR_PARSER_TOKEN)) return;

			const RAW_ATTR = CMD_BUF[ATTR_VAL][2];

			resolveAttrIndex(RAW_ATTR, TARGET_REF);
		})

		Reflect.ownKeys(VAL_BUFFER).forEach((ATTR_PROP) => {
			const ATTR_BUFFER_VALUE = VAL_BUFFER[ATTR_PROP]

			if (typeof ATTR_PROP == 'symbol') {

				const PTR_BUF = window[ATTR_PROP.toString()]?.(ATTR_PROP);

				if(!PTR_BUF[PTR_IDENTIFIER]) return;


				resolveAttr(TARGET_REF, RETURNED_ATTR_BUF, CMD_BUF);

				Object.assign(
					ATTR_HOLDER,
					RETURNED_ATTR_BUF
				)

			} else if (ATTR_BUFFER_VALUE?.[PTR_IDENTIFIER]) {
				ATTR_BUFFER_VALUE.watch((newValue) => TARGET_REF[ATTR_PROP] = newValue)
			} else {
				TARGET_REF[ATTR_PROP] = ATTR_BUFFER_VALUE
			}
		})
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
			PTR_PARSER_TOKEN = `${PARSER_UUID}-ptr`,
			EL_BUF = new WeakMap()

		if (NOT_ROOT) BASE_DF.appendChild(BASE_TEMP);

		BASE_TEMP.innerHTML = CMD_BUF
			.map(
				([CMD, TEMP_STR, TEMP_VAL], CMD_INDEX) =>
					CMD == 0
						? TEMP_STR
						: CMD == 1
						? `<${PARSER_UUID} ${PARSER_UUID}="ptr" ${PTR_PARSER_TOKEN}="${CMD_INDEX}"></${PARSER_UUID}>${TEMP_STR}`
						: CMD == 2
						? ` ${PARSER_UUID}="attr" ${ATTR_PARSER_TOKEN}-${CMD_INDEX}="${CMD_INDEX}"${TEMP_STR}`
						: CMD == 3
						? (TEMP_VAL + '').replace(ESC_REGEX, ESC_FN) + TEMP_STR
						: '',
			)
			.join('')

		BASE_TEMP
			.querySelectorAll(`[${PARSER_UUID}]`)
			.forEach((TARGET_REF) => {
				switch (TARGET_REF.getAttribute(PARSER_UUID)) {
					case 'attr': {
						resolveAttr(TARGET_REF, ATTR_PARSER_TOKEN);
						// const ATTR_HOLDER = {},
						// 	ATTR_HOLDER_PROXY = new Proxy(ATTR_HOLDER, { get: (target, prop) => target[prop] })

						// Array.from(TARGET_REF.attributes).forEach(({ name, value }) => {
						// 	if (!name.startsWith(ATTR_PARSER_TOKEN)) return

						// 	const VAL_BUFFER = CMD_BUF[value][2]

						// 	resolveAttr(TARGET_REF, VAL_BUFFER, CMD_BUF, ATTR_HOLDER_PROXY);

						// 	queueMicrotask(() => TARGET_REF.removeAttribute(name))
						// })
						// queueMicrotask(() => TARGET_REF.removeAttribute(PARSER_UUID))
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
