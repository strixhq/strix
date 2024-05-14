import { RegExp } from "./global";
import { createTag } from "./tag";

const HTML_PARSETAG_LENGTH = 16;

const HTML_PARSETAG = "sthtm-" + createTag(HTML_PARSETAG_LENGTH);
const HTML_TAG_REGEX = new RegExp("<" + HTML_PARSETAG);

// const TEXTEND_REGEX = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;

let indexMapBuffer = "";

/**
 * 
 * @param { TemplateStringsArray } ELEMENT_TSA
 * @returns { Function }
 */

const createPipeline = (

	ELEMENT_TSA

) => {

	const JOINED_HTML_TEMPLATE = ELEMENT_TSA.join(HTML_PARSETAG);
	const HTML_VALUE_LOCATION_ARRAY = ELEMENT_TSA.map(({ length }) => length);

	const HTML_TEXTEND_INDEX = JOINED_HTML_TEMPLATE.match(TEXTEND_REGEX);

	const PIPELINE_BUFFER = new Function(`() => {

	}`);

	/**

		const CustomTag = ({ name }) => html`<label>Hello, ${name}!</label>`

		input --> html`
			<div>count is ${count}</div>
			<${CustomTag} .name=${'taro'}/>
		`

		join --> `
			<div>stval-gaLoDO8NpfCkiNxP</div>
			<stval-gaLoDO8NpfCkiNxP .name=stval-gaLoDO8NpfCkiNxP/>
		`

		output --> {
			template: `
				<div id=stid-gaLoDO8NpfCkiNxP-1>
					count is <!-- sttxt-gaLoDO8NpfCkiNxP --> <!-- sttxt-gaLoDO8NpfCkiNxP -->
				</div>
				<label id=stid-lmoyyIxmjjNPZamU-1>Hello, <!-- sttxt-lmoyyIxmjjNPZamU --> <!-- sttxt-lmoyyIxmjjNPZamU -->!</label>`,
			value: {
				0: {
					type: "text"
				},

				1: {
					type: "tag"
				},

				2: {
					type: "prop",
					rel: {
						to: 1,
						key: "name"
					}
				}
			}

		}

	 */

}


/**
 * 
 * @param { TemplateStringsArray } ELEMENT_TSA 
 * @param { WeakMap } TSA_TO_STRUCTURE
 * @param { object } FRAGMENT_TO_REF
 * @param { WeakMap } REF_TO_STRUCTURE
 * @param { string } INDEX_MAP
 */

export const getPipeline = (

	ELEMENT_TSA,

	TSA_TO_STRUCTURE,
	INDEX_TO_STRUCTURE,

) => TSA_TO_STRUCTURE.get(ELEMENT_TSA) || (() => {

	let indexMapResultBuffer = "";

	ELEMENT_TSA.forEach(INDEX_EL => {

		const INDEX_BUFFER = indexMapBuffer.indexOf(INDEX_EL);

		if(INDEX_BUFFER == -1) {

			indexMapResultBuffer += indexMapBuffer.length + "-";
			indexMapBuffer += INDEX_EL;

		} else {

			indexMapResultBuffer += INDEX_BUFFER + "-";

		}
	});

	const PIPELINE_BUF = INDEX_TO_STRUCTURE[indexMapResultBuffer] || (INDEX_TO_STRUCTURE[indexMapResultBuffer] = createPipeline(ELEMENT_TSA));
	TSA_TO_STRUCTURE.set(ELEMENT_TSA, PIPELINE_BUF);

	return PIPELINE_BUF;

})();