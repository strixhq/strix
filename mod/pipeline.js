import { getTag } from "./tag";
import { globalGetter } from "./global";

const { RegExp } = globalGetter;

const HTML_PARSETAG_LENGTH = 16;

const HTML_PARSETAG = `sthtml${getTag(HTML_PARSETAG_LENGTH)}`;
const HTML_PARSETAG_REGEX = new RegExp(HTML_PARSETAG);

/**
 * 
 * @param { TemplateStringsArray } ELEMENT_TSA
 * @returns { Function }
 */

const createPipeline = (

	ELEMENT_TSA

) => {

	const JOINED_HTML_TEMPLATE = ELEMENT_TSA.join(HTML_PARSETAG);
	const HTML_VALUE_LOCATION_ARRAY = [];

	while(!HTML_PARSETAG_REGEX.test(JOINED_HTML_TEMPLATE)) {
		HTML_VALUE_LOCATION_ARRAY.push()
	}

	const PIPELINE_BUFFER = new Function(`() => {

	}`);

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

) => {
	// WeakMapから取得
	return TSA_TO_STRUCTURE.get(ELEMENT_TSA) || (() => {

		// オブジェクトがWeakMapのキーに見つからなかった場合、TemplateStringsArrayをインデックスから探索する

		// TemplateStringsArrayのlengthプロパティをキャッシュする
		const TSA_LENGTH = ELEMENT_TSA.length;

		let FragmentToRefBuffer = FRAGMENT_TO_REF;

		for(let i = 0; i < TSA_LENGTH; i++) {

			const TSA_FRAGMENT = ELEMENT_TSA[i];
			const TSA_FRAGMENT_REF = FragmentToRefBuffer[TSA_FRAGMENT]

			if(!TSA_FRAGMENT_REF) {

				// 未パースのパターンとして確定され、探索用のforループから構築用のforループに移行し、参照オブジェクトを新規作成する
				const BUF_AST = createPipeline(ELEMENT_TSA);

				for(let j = i; j < TSA_LENGTH; j++) {

					const BUF_TSAFragment = ELEMENT_TSA[j];

					FragmentToRefBuffer[BUF_TSAFragment] = {};
					FragmentToRefBuffer = FragmentToRefBuffer[BUF_TSAFragment];
				}

				REF_TO_STRUCTURE.set(FragmentToRefBuffer, BUF_AST);
				TSA_TO_STRUCTURE.set(ELEMENT_TSA, BUF_AST);

				return BUF_AST;	
			}

			FragmentToRefBuffer = TSA_FRAGMENT_REF;
		}

		const BUF_AST = REF_TO_STRUCTURE.get(FragmentToRefBuffer);
		TSA_TO_STRUCTURE.set(ELEMENT_TSA, BUF_AST);

		return BUF_AST;
	})();
}