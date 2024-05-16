import { getPipeline } from "./pipeline";
import { globalGetter } from "./keyword/global";

const { Array_isArray } = globalGetter;

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
		}
	}
};