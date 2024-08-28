import { getRandomToken } from "@strix/core"

const RESOLVER_BUFFER = new WeakMap();

const resolveTemplate = (

	[{ raw: TSA }, TVA],
	TSA_UUID,
	TSA_BEGIN_INDEX = 0,
	TSA_REGEX = new RegExp(`<[a-z\\-]+\\s+${TSA_UUID}="`, "g"),

) => {

	if(RESOLVER_BUFFER.has(TSA)) {

		return RESOLVER_BUFFER.get(TSA)?.(TVA, TSA_BEGIN_INDEX, TSA_UUID, TSA_REGEX);

	} else {

		const resolver = (TVA, TSA_BEGIN_INDEX, TSA_UUID, TSA_REGEX) => {

			const
				TVA_LENGTH = TVA.length,
				ATTR_INDEX = [],
				TVA_CALLBACKS = [],
				UUID_ARR = []
			;
		
			let
				BUF_STR
			;
				
			(BUF_STR = TSA
				.map((x, i) => {
					return x + (
						(i == TVA_LENGTH)
							? ""
							: UUID_ARR[i] = `\u0020${TSA_UUID}="${i.toString(36).padStart(8, "0")}"`
					)
				})
				.join("")
			)
				.matchAll(TSA_REGEX)
				.forEach(({ 0: { length: matchedTempLength }, index }) => {
					const BUF_SLICE_POINT = index + matchedTempLength;
					ATTR_INDEX.push(parseInt(BUF_STR.slice(BUF_SLICE_POINT, BUF_SLICE_POINT + 8), 36));
				})
			;
		
			for(let i = 0; i < TVA_LENGTH; i++) {

				const
					TVA_BUF = TVA[i],
					UUID_BUF = UUID_ARR[i],
					RESOLVED_UUID_BUF = `${TSA_UUID}="${TSA_BEGIN_INDEX.toString(36).padStart(8, "0")}"`;
				;

				if(ATTR_INDEX.includes(i)) {

					BUF_STR = BUF_STR.replace(UUID_BUF, RESOLVED_UUID_BUF);
					TVA_CALLBACKS.push(ref => Reflect.ownKeys(TVA_BUF).forEach(x => {
						const TVA_VALUE_BUF = TVA_BUF[x];
						if(typeof x == "symbol" && x in window) {
							window[x](TVA_VALUE_BUF, ref);
						} else if(window[TVA_VALUE_BUF.PTR_IDENTIFIER]) {
							TVA_VALUE_BUF.watch(newValue => ref[x] = newValue)
						} else {
							ref[x] = TVA_VALUE_BUF;
						}
					}));
					TSA_BEGIN_INDEX++;

				} else if(TVA_BUF[2]?.hasOwnProperty("strix-type")) {

					const [RESOLVED_STR, RESOLVED_TVA_CALLBACKS, RESOLVED_TOTAL_TVA] = resolveTemplate(TVA_BUF, TSA_UUID, TSA_BEGIN_INDEX, TSA_REGEX);
					TSA_BEGIN_INDEX = RESOLVED_TOTAL_TVA;
					BUF_STR = BUF_STR.replace(UUID_BUF, RESOLVED_STR);
					TVA_CALLBACKS.push(RESOLVED_TVA_CALLBACKS);

				} else {

					BUF_STR = BUF_STR.replace(UUID_BUF, `<span ${RESOLVED_UUID_BUF}></span>`);
					TVA_CALLBACKS.push(ref => {
						const TEXT_BUF = new Text();
						if(window[TVA_BUF.PTR_IDENTIFIER]) {
							TVA_BUF.watch(newValue => TEXT_BUF.textContent = newValue);
						} else {
							TEXT_BUF.textContent = TVA_BUF;
						}
						ref.replaceWith(TEXT_BUF);
					});
					TSA_BEGIN_INDEX++;

				}
			}

			return [BUF_STR, TVA_CALLBACKS, TSA_BEGIN_INDEX];

		}

		RESOLVER_BUFFER.set(TSA, resolver);

		return resolver(TVA, TSA_BEGIN_INDEX, TSA_UUID, TSA_REGEX);
	}
}

const BASE_DF = document.createDocumentFragment();

/**
 * 
 * @param {Array<TemplateStringsArray | any>} param0 
 * @returns { NodeList }
 */

const createElement = ([TSA, TVA]) => {


	const
		BASE_TEMP = document.createElement("div"),
		UUID = "strix-" + getRandomToken(32);
	;

	let [STR, TVA_CALLBACKS] = resolveTemplate([ TSA, TVA ], UUID);
	TVA_CALLBACKS = TVA_CALLBACKS.flat(Infinity);

	BASE_DF.appendChild(BASE_TEMP);

	BASE_TEMP.innerHTML = STR;

	BASE_TEMP.querySelectorAll(`[${UUID}]`).forEach((x, i) => {
		x.removeAttribute(UUID);
		TVA_CALLBACKS[i]?.(x);
	});

	return BASE_TEMP.childNodes;

}

export { createElement }