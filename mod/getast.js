import { parseAST } from "./parseast";

/**
 * 
 * @param { TemplateStringsArray } TemplateStringsArray 
 * @param { WeakMap } TSAElementMap
 * @param { object } TSAFragmentMap
 * @param { WeakMap } TSAStructureMap
 */

export const getAST = (

	TemplateStringsArray,

	TSAElementMap,
	TSAFragmentMap,
	TSAStructureMap

) => {
	// WeakMapから取得
	return TSAElementMap.get(TemplateStringsArray) || (() => {

		// オブジェクトがWeakMapのキーに見つからなかった場合、TemplateStringsArrayをインデックスから探索する

		// TemplateStringsArrayのlengthプロパティをキャッシュする
		const TSALength = TemplateStringsArray.length;
		let TSAFragmentMapBuffer = TSAFragmentMap;

		for(let i = 0; i < TSALength; i++) {

			const TSAFragmentRef = TSAFragmentMapBuffer[TSAFragment]

			if(!TSAFragmentRef) {
				// 未パースのパターンであることが確定したので、探索用のforループから構築用のforループに移行し、参照オブジェクトを新規作成する

				const TSAStructure = parseAST(TemplateStringsArray);

				for(let j = i; j < TSALength; j++) {
					const TSAFragment = TemplateStringsArray[j];
					TSAFragmentMapBuffer[TSAFragment] = {};
					TSAFragmentMapBuffer = TSAFragmentMapBuffer[TSAFragment];
				}

				TSAStructureMap.set(TSAFragmentMapBuffer, TSAStructure);
				TSAElementMap.set(TemplateStringsArray, TSAStructure);

				return TSAStructure;	
			}

			TSAFragmentMapBuffer = TSAFragmentRef;

		}

		const TSAStructure = TSAStructureMap.get(TSAFragmentMapBuffer);
		TSAElementMap.set(TemplateStringsArray, TSAStructure);

		return TSAStructure;
	})();
}