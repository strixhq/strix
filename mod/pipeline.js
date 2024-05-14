import { RegExp } from "./global";
import { createTag } from "./tag";

const HTML_PARSETAG_LENGTH = 16;

const HTML_PARSETAG = "sthtm-" + createTag(HTML_PARSETAG_LENGTH);
const HTML_TAG_REGEX = new RegExp("<" + HTML_PARSETAG);

const TEXTEND_REGEX = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;

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
 */

export const getPipeline = (

	ELEMENT_TSA,

	TSA_TO_STRUCTURE,
	FRAGMENT_TO_REF,
	REF_TO_STRUCTURE

) => TSA_TO_STRUCTURE.get(ELEMENT_TSA) || (() => {

	// オブジェクトがWeakMapのキーに見つからなかった場合、TemplateStringsArrayをインデックスから探索する

	// TemplateStringsArrayのlengthプロパティをキャッシュする
	const TSA_LENGTH = ELEMENT_TSA.length;

	let FragmentToRefBuffer = FRAGMENT_TO_REF;

	for(let i = 0; i < TSA_LENGTH; i++) {

		const TSA_FRAGMENT = ELEMENT_TSA[i];
		const TSA_FRAGMENT_REF = FragmentToRefBuffer[TSA_FRAGMENT]

		if(!TSA_FRAGMENT_REF) {

			// 未パースのパターンとして確定され、探索用のforループから構築用のforループに移行し、参照オブジェクトを新規作成する
			const PIPELINE_BUF = createPipeline(ELEMENT_TSA);

			for(let j = i; j < TSA_LENGTH; j++) {

				const BUF_TSAFragment = ELEMENT_TSA[j];

				FragmentToRefBuffer[BUF_TSAFragment] = {};
				FragmentToRefBuffer = FragmentToRefBuffer[BUF_TSAFragment];
			}

			REF_TO_STRUCTURE.set(FragmentToRefBuffer, PIPELINE_BUF);
			TSA_TO_STRUCTURE.set(ELEMENT_TSA, PIPELINE_BUF);

			// 返却
			return PIPELINE_BUF;	
		}

		FragmentToRefBuffer = TSA_FRAGMENT_REF;
	}

	const PIPELINE_BUF = REF_TO_STRUCTURE.get(FragmentToRefBuffer);
	TSA_TO_STRUCTURE.set(ELEMENT_TSA, PIPELINE_BUF);

	// 返却
	return PIPELINE_BUF;

})();