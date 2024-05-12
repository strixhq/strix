import { getTag } from "./tag";
import { globalGetter } from "./global";

const { RegExp } = globalGetter;

const HTML_PARSETAG_LENGTH = 16;

const HTML_PARSETAG = `sthtml${getTag(HTML_PARSETAG_LENGTH)}`;
const HTML_PARSETAG_REGEX = new RegExp(HTML_PARSETAG);

/**
 * 
 * @param { TemplateStringsArray } ELEMENT_TSA 
 */

export const parseAST = (

	ELEMENT_TSA

) => {

	const JOINED_HTML_TEMPLATE = ELEMENT_TSA.join(HTML_PARSETAG);
	const HTML_VALUE_LOCATION_ARRAY = [];

	while(!HTML_PARSETAG_REGEX.test(JOINED_HTML_TEMPLATE)) {
		HTML_VALUE_LOCATION_ARRAY.push()
	}

}