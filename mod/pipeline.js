import { RegExp } from "./keyword/global";
import { createTag } from "./tag";

const HTML_PARSETAG_LENGTH = 16;

const HTML_PARSETAG = "sthtm-" + createTag(HTML_PARSETAG_LENGTH);
const HTML_TAG_REGEX = new RegExp("<" + HTML_PARSETAG);

const compileValueDiffer = (
	
	ELEMENT_VAL_LENGTH,
	DIFFER_CALLBACK_COLLECTION,
	INDEX = Array.from({ length: ELEMENT_VAL_LENGTH }, (_, i) => i),

) => Function("cb", `let ${INDEX.map(x => `p${x},c${x}`).join()};return i=>{${INDEX.map(x => `c${x}=i[${x}];if(p${x}!=c${x}){cb[${x}]();p${x}=c${x}};`),join("")}}`)(DIFFER_CALLBACK_COLLECTION);

// const TEXTEND_REGEX = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;

/**
 * 
 * @param { number } ELEMENT_VAL_LENGTH 
 * @param { Function[] } DIFFER_CALLBACK_COLLECTION 
 * @returns { (i: any[]) => void }
 */

const createValueDiffer = (

	ELEMENT_VAL_LENGTH,
	DIFFER_CALLBACK_COLLECTION,

	REFRESH_ALWAYS_INDEX

) => {

	const FILLED_ARRAY = Array.from({ length: ELEMENT_VAL_LENGTH }, (_, i) => i);

	return [];
}

/**
 * 
 * @param { TemplateStringsArray } ELEMENT_TSA
 * @param { number } ELEMENT_TSA_LENGTH
 * 
 * @returns { Function }
 */

const createPipeline = (

	ELEMENT_TSA,
	ELEMENT_TSA_LENGTH,

) => {

	const JOINED_HTML_TEMPLATE = ELEMENT_TSA.join(HTML_PARSETAG);
	const HTML_VALUE_LOCATION_ARRAY = ELEMENT_TSA.map(({ length }) => length);

	const HTML_TEXTEND_INDEX = JOINED_HTML_TEMPLATE.match(TEXTEND_REGEX);

	const [VALUE_DIFFER_ACTIVE, VALUE_DIFFER_INACTIVE] = compileValueDiffer(ELEMENT_TSA_LENGTH - 1, []);

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

		ast --> {
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

		result --> (() => {
			let
				PREV_0,
				PREV_1,
				PREV_2,

				RES_0,
				RES_1,
				RES_2;

			return ([ CURR_0, CURR_1, CURR_2 ], REFRESH_CALLBACK) => {

				RES_0 = PREV_0 == CURR_0;
				RES_1 = PREV_1 == CURR_1;
				RES_2 = PREV_2 == CURR_2;

				PREV_0 = CURR_0;
				PREV_1 = CURR_1;
				PREV_2 = CURR_2;

				REFRESH_CALLBACK(RES_0, RES_1, RES_2);
			}
		})();

	 */

}


/**
 * 
 * @param { TemplateStringsArray } ELEMENT_TSA
 * @param { number } ELEMENT_TSA_LENGTH
 * 
 * @param { WeakMap } TSA_TO_PIPELINE
 * @param { object } INDEX_TO_PIPELINE
 */

export const getPipeline = (

	ELEMENT_TSA,
	ELEMENT_TSA_LENGTH,

	TSA_TO_PIPELINE,
	INDEX_TO_PIPELINE,

) => TSA_TO_PIPELINE.get(ELEMENT_TSA) || (() => {

	const JOINED_ELEMENT_TSA = ELEMENT_TSA.raw.join("\0");

	const PIPELINE_BUF = 
		INDEX_TO_PIPELINE[JOINED_ELEMENT_TSA] ||
		(INDEX_TO_PIPELINE[JOINED_ELEMENT_TSA] = createPipeline(ELEMENT_TSA, ELEMENT_TSA_LENGTH));

	TSA_TO_PIPELINE.set(ELEMENT_TSA, PIPELINE_BUF);

	return PIPELINE_BUF;

})();