import { random } from "@ihasq/random"

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

const resolveFragmentRoot = (template) => {
	const CMD_BUFFER = [[undefined, template[0][0]]];
	resolveFragment(template, CMD_BUFFER);
	return CMD_BUFFER;
};

export const createElement = (fragment) => {
	const CMD_BUFFER = resolveFragmentRoot(fragment),
		BASE_TEMP = document.createElement('div'),
		PARSER_UUID = `strix-${random(32)}`,
		CONCATTED_TEMPLATE = CMD_BUFFER.map(
			([x0, x1], i) =>
				(typeof x0 == 'object'
					? x0[Symbol.for('PTR_IDENTIFIER')]
						? `<span ${PARSER_UUID}-ptr="${i}"></span>`
						: `${PARSER_UUID}-attr="${i}"`
					: '') + x1
		).join('');

	BASE_DF.appendChild(BASE_TEMP);
	BASE_TEMP.innerHTML = CONCATTED_TEMPLATE;
	BASE_TEMP.querySelectorAll(`[${PARSER_UUID}-attr]`).forEach((targetRef) => {
		const ATTR_BUFFER =
			CMD_BUFFER[Number(targetRef.getAttribute(`${PARSER_UUID}-attr`))][0];
		Reflect.ownKeys(ATTR_BUFFER).forEach((attrIndex) => {
			if (typeof attrIndex == 'symbol') {
				window[attrIndex.toString()](attrIndex)(
					ATTR_BUFFER[attrIndex],
					targetRef
				);
			} else {
				targetRef[attrIndex] = ATTR_BUFFER[attrIndex];
			}
		});
		targetRef.removeAttribute(`${PARSER_UUID}-attr`);
	});
	BASE_TEMP.querySelectorAll(`[${PARSER_UUID}-ptr]`).forEach((targetRef) => {
		const PTR_BUFFER =
			CMD_BUFFER[Number(targetRef.getAttribute(`${PARSER_UUID}-ptr`))][0];
		const TEXT_BUF = new Text();
		PTR_BUFFER.watch((newValue) => TEXT_BUF.textContent = newValue);
		targetRef.replaceWith(TEXT_BUF);
	});

	return BASE_TEMP.childNodes;
};