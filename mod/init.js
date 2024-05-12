import { getAST } from "./getast";
import { refresh } from "./property";
import { globalGetter } from "./global";

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

	const ELEMENT_TYPE = (() => {
		switch(initRound) {
			case 1: return IS_FIRST_RAW ? "fragment" : "instance";
			case 2: return "transformer";
			case 3: return "component"; 
		}
	})()

	const [ ELEMENT_TSA, ELEMENT_VAL ] = IS_FIRST_RAW
		? [ initStageArray[initRound], initStageArray[initRound - 1]() ]
		: [ initStageArray[initRound - 1](), initStageArray[initRound] ];

	// パース済のASTオブジェクトを取得
	const AST_BUF = getAST(

		ELEMENT_TSA,

		TSA_TO_STRUCTURE,
		FRAGMENT_TO_REF,
		REF_TO_STRUCTURE

	);

	const refreshFunc = initStageArray[initRound];

	return {
		type: ELEMENT_TYPE,
		refresh() {
			return refreshFunc(!IS_FIRST_RAW)
		}
	}

};
