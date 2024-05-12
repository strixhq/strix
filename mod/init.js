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

	const RESULT_STAGE_ARRAY = [STRIX_HTML_ELEMENT];
	
	let initRound = 0;
	
	for(null; initRound < 3; initRound++) {

		const RESULT_BUFFER = RESULT_STAGE_ARRAY[initRound](ATTR_OBJECT);
		RESULT_STAGE_ARRAY.push(RESULT_BUFFER);
		if(Array_isArray(RESULT_BUFFER)) break;

	}

	const IS_INSTANCE = "raw" in RESULT_STAGE_ARRAY[initRound];

	if((initRound !== 0) && IS_INSTANCE) {
		return 0;
	}

	const ELEMENT_TYPE = [

		IS_INSTANCE
			? "fragment"
			: "instance",
		"transformer",
		"component",

	][initRound];

	const [ ELEMENT_TSA, ELEMENT_VAL ] = IS_INSTANCE
		? [ RESULT_STAGE_ARRAY[initRound - 1](), RESULT_STAGE_ARRAY[initRound] ]
		: [ RESULT_STAGE_ARRAY[initRound], RESULT_STAGE_ARRAY[initRound - 1]() ];

	// パース済のASTオブジェクトを取得
	const BUF_AST = getAST(

		ELEMENT_TSA,

		TSA_TO_STRUCTURE,
		FRAGMENT_TO_REF,
		REF_TO_STRUCTURE

	);

	return {
		[refresh]() {
			REFRESH_FUNC();
		}
	}


}