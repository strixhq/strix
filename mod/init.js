import { getPipeline } from "./pipeline";
import { Array_isArray } from "./keyword/global";

import { createId } from "./id.js";

/**
 * 
 * @param { StrixHTMLElement } STRIX_HTML_ELEMENT
 * @param { object } ATTR_OBJECT
 * 
 * @param { WeakMap } TSA_TO_STRUCTURE
 * @param { object } FRAGMENT_TO_REF
 * @param { WeakMap } REF_TO_STRUCTURE
 */

export const initStrixHTMLElement = (

	STRIX_HTML_ELEMENT,
	ATTR_OBJECT,

	TSA_TO_STRUCTURE,
	FRAGMENT_TO_REF,
	REF_TO_STRUCTURE,

	ELEMENT_TO_STRUCTURE,

) => {

	const initStageArray = [STRIX_HTML_ELEMENT];
	
	let initRound = 0;
	
	for(null; initRound < 3; initRound++) {

		const RESULT_BUFFER = initStageArray[initRound](ATTR_OBJECT);
		initStageArray.push(RESULT_BUFFER);
		if(Array_isArray(RESULT_BUFFER)) {
			break
		};
	}

	const IS_FIRST_RAW = "raw" in initStageArray[initRound];

	if(initRound !== 0 && !IS_FIRST_RAW) {
		return undefined;
	};

	const ELEMENT_TYPE = [
		IS_FIRST_RAW ? "fragment" : "instance",
		"transformer",
		"component",
	][initRound];

	const [ ELEMENT_TSA, ELEMENT_VAL ] = IS_FIRST_RAW

		? [ initStageArray[initRound], initStageArray[initRound - 1]() ]
		: [ initStageArray[initRound - 1](), initStageArray[initRound] ];

	// パース済のパイプラインオブジェクトを取得
	const PIPELINE_BUF = getPipeline(

		ELEMENT_TSA,

		TSA_TO_STRUCTURE,
		FRAGMENT_TO_REF,
		REF_TO_STRUCTURE

	);

	const refreshFunc = initStageArray[initRound];

	return {

		type: ELEMENT_TYPE,

		refresh() {
			return refreshFunc(!IS_FIRST_RAW);
		},

		index: {
			always: [0, 3, 5, 6, 7, 10]
		}
	}
};

const fragmentBuffer = document.createDocumentFragment();

export const initComponent = async (componentFn, initObject) => {

	const [

		HTMLBuffer,
		valueBuffer,
		initTimestamp

	] = await componentFn(initObject);

	const HTMLBufferLength = HTMLBuffer.length;

	const tokenId = `strix-${createId({
		length: 16,
	})}`;

	const joinedHTMLBuffer = HTMLBuffer
		.map((x, i) => x + (i + 1 == HTMLBufferLength)
			? ""
			: `${tokenId}-${i}`
		)
		.join("")
	;

	fragmentBuffer.innerHTML = joinedHTMLBuffer;

	const resultObject = {
		element: fragmentBuffer,
		index: []
	};

	let selectBuffer, valueSelectBuffer;

	for(let i = 0; i < HTMLBufferLength, i++;) {
		if(!resultObject.index[i]) {
			valueSelectBuffer = valueBuffer[i];
			if(selectBuffer = fragmentBuffer.getElementByTagName(`${tokenId}-${i}`.toUpperCase())) {
				const result = await initComponent(valueBuffer[i]);
				resultObject.index[i] = {
					type: "tag",
				};
				// valueBuffer[i] is a component function
			} else if(selectBuffer = fragmentBuffer.querySelector(`[${tokenId}-${i}]`)) {
				resultObject.index[i] = "attr";
			} else {
				resultObject.index[i] = "text"
			}
		}
	}
	return resultObject;
}
