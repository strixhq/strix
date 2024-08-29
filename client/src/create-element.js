import { random as getRandomToken } from "@ihasq/random"

const RESOLVER_BUFFER = new WeakMap();
const TSA_ATTR_BUFFER = new WeakMap();

const morphTSA = (target) => {
	target.forEach((x, i) => {
		if(Array.isArray(x)) {
			target[i - 1] += x[0];
			target[i + 1] = x[x.length - 1] + target[i + 1];
			x[0] = x[x.length - 1] = undefined;
		}
	});
	return target.flat().filter(Boolean);
}

const resolveTSA = (

	RAW_TSA,
	PARSER_UUID,
	PARSER_UUID_REGEX = new RegExp(`<[a-z\\-]+\\s+${PARSER_UUID}="`, "g"),

) => (

	TSA_ATTR_BUFFER.has(RAW_TSA)

		? TSA_ATTR_BUFFER.get(RAW_TSA)

		: (() => {


			let BUF_STR;

			const
				ATTR_INDEX = [],
				TVA_LENGTH = RAW_TSA.length - 1
			;

			(BUF_STR = RAW_TSA
				.map((x, i) => x + (
					(i == TVA_LENGTH)
						? ""
						: `\u0020${PARSER_UUID}="${i.toString(36).padStart(8, "0")}"`
				))
				.join("")
			)
				.matchAll(PARSER_UUID_REGEX)
				.forEach(({ 0: { length: matchedTempLength }, index }) => {
					const BUF_SLICE_POINT = index + matchedTempLength;
					ATTR_INDEX.push(parseInt(BUF_STR.slice(BUF_SLICE_POINT, BUF_SLICE_POINT + 8), 36));
				})
			;

			const EXTENDABLE_TSA = Array.from(RAW_TSA);

			TSA_ATTR_BUFFER.set(RAW_TSA, [ATTR_INDEX, EXTENDABLE_TSA]);

			return [ATTR_INDEX, EXTENDABLE_TSA];

		})()
)

const resolveTemplate = (

	[{ raw: RAW_TSA }, TVA],
	TSA_UUID,
	TSA_BEGIN_INDEX = 0,
	TSA_REGEX = new RegExp(`<[a-z\\-]+\\s+${TSA_UUID}="`, "g"),

) => {

	const
		TVA_LENGTH = TVA.length,
		[RESOLVED_ATTR_INDEX, TSA] = resolveTSA(RAW_TSA, TSA_UUID, TSA_REGEX)
	;

	const RESOLVER_BUFFER = [];

	let TVA_STEPUP = 0;

	for(let i = 0; i < TVA_LENGTH; i++) {
		const BUF_TVA = TVA[i];
		if(RESOLVED_ATTR_INDEX.includes(i)) {
			RESOLVER_BUFFER.push(ref => Reflect.ownKeys(BUF_TVA).forEach(x => {
				const TVA_VALUE_BUF = BUF_TVA[x];
				let SYMBOL_TOKEN;
				if(typeof x == "symbol" && (SYMBOL_TOKEN = x.toString()) in window) {
					window[SYMBOL_TOKEN](x)?.(TVA_VALUE_BUF, ref);
				} else if(window[TVA_VALUE_BUF.PTR_IDENTIFIER]) {
					BUF_TVA.watch(newValue => ref[x] = newValue)
				} else {
					ref[x] = TVA_VALUE_BUF;
				}
			}));
		} else if(BUF_TVA[2]?.hasOwnProperty("strix-type")) {
			const [RESOLVED_TSA, RESOLVED_TVA_CALLBACKS] = resolveTemplate(BUF_TVA, TSA_UUID, TSA_BEGIN_INDEX, TSA_REGEX);
			TSA.splice(TVA_STEPUP + i, 0, ...RESOLVED_TSA);

			TSA[TVA_STEPUP + i - 1] += RESOLVED_TSA[0];
			TSA[TVA_STEPUP + i + 1] = RESOLVED_TSA[RESOLVED_TSA.length - 1] + TSA[TVA_STEPUP + i + 1];

			TVA_STEPUP += RESOLVED_TSA.length;

			[TSA[TVA_STEPUP + i], TSA[TVA_STEPUP + i + RESOLVED_TSA.length - 1]] = [undefined, undefined];

			if(RESOLVED_TVA_CALLBACKS) {
				RESOLVER_BUFFER.push(RESOLVED_TVA_CALLBACKS);
			}
		} else {
			RESOLVER_BUFFER.push(ref => {
				const TEXT_BUF = new Text();
				if(window[TVA_BUF.PTR_IDENTIFIER]) {
					TVA_BUF.watch(newValue => TEXT_BUF.textContent = newValue);
				} else {
					TEXT_BUF.textContent = TVA_BUF;
				}
				ref.replaceWith(TEXT_BUF);
			})
		}
	}

	return [TSA.filter(Boolean), RESOLVER_BUFFER];

}
// const
// 	TVA_LENGTH = TVA.length,
// 	[ATTR_INDEX] = TSA_ATTR_BUFFER.has(TSA)
// 		? TSA_ATTR_BUFFER.get(TSA)
// 		: (() => {

// 			const ATTR_INDEX = [];

// 			TSA
// 				.map((x, i) => {
// 					return x + (
// 						(i == TVA_LENGTH)
// 							? ""
// 							: UUID_ARR[i] = `\u0020${TSA_UUID}="${i.toString(36).padStart(8, "0")}"`
// 					)
// 				})
// 				.join("")
// 				.matchAll(TSA_REGEX)
// 				.forEach(({ 0: { length: matchedTempLength }, index }) => {
// 					const BUF_SLICE_POINT = index + matchedTempLength;
// 					ATTR_INDEX.push(parseInt(BUF_STR.slice(BUF_SLICE_POINT, BUF_SLICE_POINT + 8), 36));
// 				})
// 			;

// 			RESOLVER_BUFFER.set(TSA, [ATTR_INDEX]);

// 			return [ATTR_INDEX];

// 		})()
// ;

// for(let i = 0; i < TVA_LENGTH; i++) {

// 	const
// 		TVA_BUF = TVA[i],
// 		UUID_BUF = UUID_ARR[i],
// 		RESOLVED_UUID_BUF = `${TSA_UUID}="${TSA_BEGIN_INDEX.toString(36).padStart(8, "0")}"`;
// 	;

// 	if(ATTR_INDEX.includes(i)) {
// 		TVA_CALLBACKS.push(ref => Reflect.ownKeys(TVA_BUF).forEach(x => {
// 			const TVA_VALUE_BUF = TVA_BUF[x];
// 			if(typeof x == "symbol" && x in window) {
// 				window[x](TVA_VALUE_BUF, ref);
// 			} else if(window[TVA_VALUE_BUF.PTR_IDENTIFIER]) {
// 				TVA_VALUE_BUF.watch(newValue => ref[x] = newValue)
// 			} else {
// 				ref[x] = TVA_VALUE_BUF;
// 			}
// 		}));
// 		TSA_BEGIN_INDEX++;

// 	} else if(TVA_BUF[2]?.hasOwnProperty("strix-type")) {

// 		const [RESOLVED_STR, RESOLVED_TVA_CALLBACKS, RESOLVED_TOTAL_TVA] = resolveTemplate(TVA_BUF, TSA_UUID, TSA_BEGIN_INDEX, TSA_REGEX);
// 		TSA_BEGIN_INDEX = RESOLVED_TOTAL_TVA;
// 		TVA_CALLBACKS.push(RESOLVED_TVA_CALLBACKS);

// 	} else {
// 		TVA_CALLBACKS.push(ref => {
// 			const TEXT_BUF = new Text();
// 			if(window[TVA_BUF.PTR_IDENTIFIER]) {
// 				TVA_BUF.watch(newValue => TEXT_BUF.textContent = newValue);
// 			} else {
// 				TEXT_BUF.textContent = TVA_BUF;
// 			}
// 			ref.replaceWith(TEXT_BUF);
// 		});
// 		TSA_BEGIN_INDEX++;

// 	}
// }

// return [BUF_STR, TVA_CALLBACKS, TSA_BEGIN_INDEX];

// if(RESOLVER_BUFFER.has(TSA)) {

// 	return RESOLVER_BUFFER.get(TSA)?.(TVA, TSA_BEGIN_INDEX, TSA_UUID, TSA_REGEX);

// } else {


// 	const resolver = (TVA, TSA_BEGIN_INDEX, TSA_UUID, TSA_REGEX) => {

// 		const
// 			TVA_LENGTH = TVA.length,
// 			TVA_CALLBACKS = [],
// 			UUID_ARR = []
// 		;
	
// 		let
// 			BUF_STR
// 		;

// 	}

// 	return resolver(TVA, TSA_BEGIN_INDEX, TSA_UUID, TSA_REGEX);
// }

const BASE_DF = document.createDocumentFragment();

/**
 * 
 * @param {Array<TemplateStringsArray | any>} param0 
 * @returns { NodeList }
 */

const createElement = ([TSA, TVA]) => {


	const
		BASE_TEMP = document.createElement("div"),
		PARSER_UUID = "strix-" + getRandomToken(32);
	;

	let [STR, TVA_CALLBACKS] = resolveTemplate([ TSA, TVA ], PARSER_UUID);
	TVA_CALLBACKS = TVA_CALLBACKS.flat(Infinity);

	BASE_DF.appendChild(BASE_TEMP);

	BASE_TEMP.innerHTML = STR;

	BASE_TEMP.querySelectorAll(`[${PARSER_UUID}]`).forEach((x, i) => {
		x.removeAttribute(PARSER_UUID);
		TVA_CALLBACKS[i]?.(x);
	});

	return BASE_TEMP.childNodes;

}

export { createElement }