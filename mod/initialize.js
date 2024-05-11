import { getAST } from "./getast";

/**
 * 
 * @param { StrixHTMLElement } STRIX_HTML_ELEMENT 
 * @param { object } ATTR_OBJECT 
 * 
 * @param { WeakMap } TSA_TO_STRUCTURE
 * @param { object } FRAGMENT_TO_REF
 * @param { WeakMap } REF_TO_STRUCTURE
 */

export const initializeStrixHTMLElement = (

	STRIX_HTML_ELEMENT,
	ATTR_OBJECT,

	TSA_TO_STRUCTURE,
	FRAGMENT_TO_REF,
	REF_TO_STRUCTURE

) => {

	let elementType = undefined;

	let resultBuffer = STRIX_HTML_ELEMENT(ATTR_OBJECT);

	if(Array.isArray(resultBuffer)) {

		elementType = "raw" in resultBuffer? "fragment" : "instance";

		const [ ELEMENT_TSA, ELEMENT_VAL ] = elementType === "fragment"
			? [ STRIX_HTML_ELEMENT(), resultBuffer ]
			: [ resultBuffer, STRIX_HTML_ELEMENT() ];
		
		// パース済のASTオブジェクトを取得
		const BUF_AST = getAST(

			ELEMENT_TSA,

			TSA_TO_STRUCTURE,
			FRAGMENT_TO_REF,
			REF_TO_STRUCTURE

		);
	}
}