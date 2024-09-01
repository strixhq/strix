import { random } from "jsr:@ihasq/random@0.1.6"

const BASE_DF = document.createDocumentFragment();

const resolveFragment = (
	[TemplateStringsArray, TemplateValuesArray, STRIX_HTML_FRAGMENT],
	commandBuffer
) => {
	TemplateValuesArray.forEach((x, i) => {
		if (Array.isArray(x) && x[2] === STRIX_HTML_FRAGMENT) {
			commandBuffer.push([undefined, x[0][0]]);
			resolveFragment(x, commandBuffer);
			commandBuffer.push([undefined, TemplateStringsArray[i + 1]]);
		} else {
			commandBuffer.push(
				typeof x == 'object' ? [x, TemplateStringsArray[i + 1]] : [undefined, x]
			);
		}
	});

	commandBuffer.push([
		undefined,
		TemplateStringsArray[TemplateStringsArray.length - 1],
	]);
};

/**
 * 
 * @param { any[] } template 
 * @returns any[]
 */

const resolveFragmentRoot = (template) => {
	const CMD_BUFFER = [[undefined, template[0][0]]];
	resolveFragment(template, CMD_BUFFER);
	return CMD_BUFFER;
};

/**
 * 
 * @param { any[] } fragment 
 * @returns 
 */

export const createElement = (fragment) => {

	const
		CMD_BUFFER = resolveFragmentRoot(fragment),
		BASE_TEMP = document.createElement('div'),
		PARSER_UUID = `strix-${random(32)}`,
		PARSER_TOKEN_ATTR = `${PARSER_UUID}-attr`,
		PARSER_TOKEN_PTR = `${PARSER_UUID}-ptr`,
		CONCATTED_TEMPLATE = CMD_BUFFER
			.map(
				([x0, x1], i) =>
					(typeof x0 == 'object'
						? x0[Symbol.for('PTR_IDENTIFIER')]
							? `<${PARSER_UUID} ${PARSER_TOKEN_PTR}="${i}"></${PARSER_UUID}>`
							: ` ${PARSER_TOKEN_ATTR}="${i}"`
						: '') + x1
			)
			.join('')
	;

	console.log(CONCATTED_TEMPLATE);

	BASE_DF.appendChild(BASE_TEMP);
	BASE_TEMP.innerHTML = CONCATTED_TEMPLATE;
	BASE_TEMP.querySelectorAll(`[${PARSER_TOKEN_ATTR}], [${PARSER_TOKEN_PTR}]`).forEach((targetRef) => {
		if(targetRef.hasAttribute(PARSER_TOKEN_ATTR)) {

			const
				ATTR_BUFFER = CMD_BUFFER[Number(targetRef.getAttribute(PARSER_TOKEN_ATTR))][0]
			;

			Reflect.ownKeys(ATTR_BUFFER).forEach((attrIndex) => {

				const
					ATTR_BUFFER_VALUE = ATTR_BUFFER[attrIndex]
				;

				if (typeof attrIndex == 'symbol') {

					window[attrIndex.toString()]?.(attrIndex)?.$(
						ATTR_BUFFER[attrIndex],
						targetRef
					);

				} else {

					if(ATTR_BUFFER_VALUE?.[Symbol.for("PTR_IDENTIFIER")]) {
						ATTR_BUFFER_VALUE.watch(newValue => targetRef[attrIndex] = newValue);
					} else {
						targetRef[attrIndex] = ATTR_BUFFER_VALUE;
					}

				}
			});
			targetRef.removeAttribute(PARSER_TOKEN_ATTR);

		} else {

			const
				PTR_BUFFER = CMD_BUFFER[Number(targetRef.getAttribute(PARSER_TOKEN_PTR))][0],
				TEXT_BUF = new Text()
			;

			targetRef.replaceWith(TEXT_BUF);
			PTR_BUFFER.watch((newValue) => TEXT_BUF.textContent = newValue);
		}
	}); 

	return BASE_TEMP.childNodes;
};