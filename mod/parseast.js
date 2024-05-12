import { GET_TAG } from "./tag";
import { globalGetter } from "./global";

const { RegExp } = globalGetter;

/**
 * 
 * @param { TemplateStringsArray } ELEMENT_TSA 
 */

export const TSA_TO_AST = (

	ELEMENT_TSA

) => {

	const HTML_PARSETAG_LENGTH = 16;

	const HTML_PARSETAG = `sthtml${GET_TAG(HTML_PARSETAG_LENGTH)}`;
	const HTML_PARSETAG_REGEX = new RegExp(HTML_PARSETAG);

	const JOINED_HTML_TEMPLATE = ELEMENT_TSA.join(HTML_PARSETAG);
	const HTML_VALUE_LOCATION_ARRAY = [];

	while(!HTML_PARSETAG_REGEX.test(JOINED_HTML_TEMPLATE)) {
		HTML_VALUE_LOCATION_ARRAY.push()
	}

}