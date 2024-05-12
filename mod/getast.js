import { parseAST } from "./parseast";

/**
 * 
 * @param { TemplateStringsArray } ELEMENT_TSA 
 * @param { WeakMap } TSA_TO_STRUCTURE
 * @param { object } FRAGMENT_TO_REF
 * @param { WeakMap } REF_TO_STRUCTURE
 */

export const getAST = (

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

		let TSAFragmentMap = FRAGMENT_TO_REF;

		for(let i = 0; i < TSA_LENGTH; i++) {

			const TSA_FRAGMENT = ELEMENT_TSA[i];
			const TSA_FRAGMENT_REF = TSAFragmentMap[TSA_FRAGMENT]

			if(!TSA_FRAGMENT_REF) {

				// 未パースのパターンであることが確定したので、探索用のforループから構築用のforループに移行し、参照オブジェクトを新規作成する
				const BUF_AST = parseAST(ELEMENT_TSA);

				for(let j = i; j < TSA_LENGTH; j++) {

					const BUF_TSAFragment = ELEMENT_TSA[j];

					TSAFragmentMap[BUF_TSAFragment] = {};
					TSAFragmentMap = TSAFragmentMap[BUF_TSAFragment];
				}

				REF_TO_STRUCTURE.set(TSAFragmentMap, BUF_AST);
				TSA_TO_STRUCTURE.set(ELEMENT_TSA, BUF_AST);

				return BUF_AST;	
			}

			TSAFragmentMap = TSA_FRAGMENT_REF;
		}

		const BUF_AST = REF_TO_STRUCTURE.get(TSAFragmentMap);
		TSA_TO_STRUCTURE.set(ELEMENT_TSA, BUF_AST);

		return BUF_AST;
	})();
}