/**
 * 
 * @param { TemplateStringsArray } TemplateStringsArray 
 * @param { WeakMap } TSAStructureMap
 * @param { object } TSAFragmentMap
 */

export const getAST = (

	TemplateStringsArray,
	TSAStructureMap,

	TSAFragmentMap,

) => {
	// WeakMapから取得
	return TSAStructureMap.get(TemplateStringsArray) || (() => {

		// オブジェクトがWeakMapのキーに見つからなかった場合、TemplateStringsArrayをインデックスから探索する

		// TemplateStringsArrayのlengthプロパティをキャッシュする
		const TSALength = TemplateStringsArray.length;
		let TSAFragmentBuffer = TSAFragmentMap;

		for(let i = 0; i < TSALength; i++) {

			const TSAFragment = TemplateStringsArray[i];
			const TSAFragmentRef = TSAFragmentBuffer[TSAFragment]

			if(!TSAFragmentRef) {

				// 未パースのパターンであることが確定したので、探索用のforループから構築用のforループに移行し、参照オブジェクトを新規作成する
				for(let j = i; j < TSALength; j++) {
					TSAFragmentBuffer[TSAFragment][TemplateStringsArray[j + 1]] = {};
				}
	
				break;
			}

			TSAFragmentBuffer = TSAFragmentRef;

		}

		return TSAStructureMap.get(TSAFragmentBuffer);
	})();
}