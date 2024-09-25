import { random } from 'jsr:@ihasq/random@0.1.6'
import { getAddress } from 'jsr:@strix/core@0.0.10'


const PTR_IDENTIFIER = Symbol.for("PTR_IDENTIFIER")


const BASE_DF = document.createDocumentFragment(),

	ESC_REGEX = /["&'<>`]/g,
	ESC_CHARCODE_BUF = {},
	ESC_FN = (match): string => `&#x${ESC_CHARCODE_BUF[match] ||= match.charCodeAt(0).toString(16)};`,

	OBJ_PROTO = Reflect.getPrototypeOf({}),
	FN_PROTO = Reflect.getPrototypeOf(() => {}),

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
					: typeof VAL == "object" && Reflect.getPrototypeOf(VAL) == OBJ_PROTO
					? 2
					: 3,
				TSA[VAL_INDEX + 1],
				VAL,
			])),
		)
		return FRAG_ARR
	},

	resolveAttr = (RAW_ATTR, TARGET_REF) => {
		// console.log(RAW_ATTR)

		Reflect.ownKeys(RAW_ATTR).forEach(RAW_ATTR_KEY => {
			const RAW_ATTR_VALUE = RAW_ATTR[RAW_ATTR_KEY]

			if(typeof RAW_ATTR_KEY == 'symbol') {
				
				const PTR_BUF = globalThis[getAddress(RAW_ATTR_KEY) as string]?.(RAW_ATTR_KEY);

				// console.log(PTR_BUF)

				if(!PTR_BUF?.[PTR_IDENTIFIER]) {
					TARGET_REF[RAW_ATTR_KEY] = RAW_ATTR_VALUE
					return;
				};
				
				const ATTR_PROCESSOR_FN = PTR_BUF.$;

				if(!(Reflect.getPrototypeOf(ATTR_PROCESSOR_FN) == FN_PROTO)) return;
				
				const RETURNED_ATTR_BUF = ATTR_PROCESSOR_FN(RAW_ATTR_VALUE, TARGET_REF)

				if(typeof RETURNED_ATTR_BUF != "object" || RETURNED_ATTR_BUF[PTR_IDENTIFIER] ||Reflect.getPrototypeOf(RETURNED_ATTR_BUF) !== OBJ_PROTO) return;

				resolveAttr(RETURNED_ATTR_BUF, TARGET_REF);
			} else {
				TARGET_REF[RAW_ATTR_KEY] = RAW_ATTR_VALUE
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
						Array.from(TARGET_REF.attributes).forEach(({ name: ATTR_NAME, value: ATTR_VAL }) => {

							if (!ATTR_NAME.startsWith(ATTR_PARSER_TOKEN)) return;
				
							const RAW_ATTR = CMD_BUF[ATTR_VAL][2];
				
							resolveAttr(RAW_ATTR, TARGET_REF);
						})
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
