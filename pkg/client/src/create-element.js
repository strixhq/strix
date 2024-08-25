import { getRandomToken } from "@strix/core"

const resolveTemplate = ([{ raw: TSA }, TVA], TSA_UUID, TSA_REGEX, TSA_BEGIN_INDEX) => {

	const
		TVA_LENGTH = TVA.length,
		ATTR_INDEX = [],
		TVA_CALLBACKS = []
	;

	let BUF_STR;
		
	(BUF_STR = TSA
		.map((x, i) => x + (i == TVA_LENGTH ? "" : `id="${TSA_UUID}-${
			(TSA_BEGIN_INDEX + i)
				.toString(36)
				.padStart(8, "0")
		}"`))
		.join("")
	)
		.matchAll(TSA_REGEX)
		.forEach(([matchedTemp]) => {
			ATTR_INDEX.push(parseInt(matchedTemp.slice(-10, -2), 36))
		})
	;

	return {
		formattedTemplate: BUF_STR,
		initializerCallbacks: Array(TVA_LENGTH).fill(0).map((_, i) => 
			ATTR_INDEX.includes(TSA_BEGIN_INDEX + i)
				? () => {

				}
				: () => {
					
				}
		)
	}

	// for(let TVA_index = 0; TVA_index < TVA_LENGTH; TVA_index++) {

	// 	const
	// 		ID_STR = `${TSA_UUID}-${TVA_index.toString(36).padStart(8, "0")}`
	// 		TOKEN_STR = `id="${ID_STR}"`,
	// 		TVA_BUF = TVA[TVA_index],
	// 		TVA_BUF_TYPE = (
	// 			typeof TVA_BUF == "object" &&
	// 			typeof TVA_BUF.toString() == "symbol" &&
	// 			TVA_BUF in window
	// 		)
	// 			? "POINTER"
	// 			: "PRIMITIVE"
	// 	;

	// 	if(ATTR_INDEX.includes(TVA_index)) {
	// 		BUF_STR = BUF_STR.replace(TOKEN_STR, `<span ${TOKEN_STR}></span>`);
	// 		TVA_CALLBACKS.push(() => {
	// 			const TEXT_BUF = new Text();
	// 			BASE_TEMP.querySelector(`#${ID_STR}`).replaceWith(TEXT_BUF);
	// 			if(TVA_BUF_TYPE == "POINTER") {
	// 				TEXT_BUF.textContent = window[TVA_BUF];
	// 				TVA_BUF.watch(newValue => TEXT_BUF.textContent = newValue);
	// 			} else {
	// 				TEXT_BUF.textContent = TVA_BUF;
	// 			}
	// 		})
	// 	} else {
	// 		TVA_CALLBACKS.push(() => {
	// 			console.log(TVA_BUF)
	// 			const TEMP_BUF = BASE_TEMP.querySelector(`#${ID_STR}`);
	// 			Reflect.ownKeys(TVA_BUF).forEach(x => {
	// 				if(typeof x == "symbol" && x in window) {
	// 					window[x](TVA_BUF[x], TEMP_BUF);
	// 				} else {
	// 					TEMP_BUF[x] = TVA_BUF[x];
	// 				}
	// 			})

	// 		})
	// 	}
	// }

	// return {
	// 	tempString: BUF_STR
	// }
}

const BASE_DF = document.createDocumentFragment();

const createElement = ([{ raw: TSA }, TVA]) => {

	const
		TSA_UUID = "strix-" + getRandomToken(32),
		// TSA_LENGTH = TSA.length - 1,
		TSA_REGEX = new RegExp(`<[a-z\-]+ id="${TSA_UUID}-[a-z0-9]+">`, "g"),
		TVA_LENGTH = TVA.length,
		BASE_TEMP = document.createElement("div"),
		BUF_RESULT = [],
		ATTR_INDEX = []
	;

	BASE_DF.appendChild(BASE_TEMP);
	
	let
		BUF_STR = TSA
			.map((x, i) => {
				let
					BUF_TVA = TVA[i],
					BUF_ADDR
				;

				BUF_TVA = (
					typeof BUF_TVA == "object" &&
					typeof (BUF_ADDR = BUF_TVA.toString()) == "symbol" &&
					BUF_ADDR in window
				)
					? window[BUF_ADDR]
					: BUF_TVA
				;

				return x + (i == TVA_LENGTH ? "" : `id="${TSA_UUID}-${i.toString(36).padStart(8, "0")}"`)
			})
			.join("")
	;

	console.log(BUF_STR);

	BUF_STR.matchAll(TSA_REGEX).forEach(({ 0: matchedTemp, index }, i) => {
		ATTR_INDEX.push(parseInt(matchedTemp.slice(-10, -2), 36))
	});

	console.log(ATTR_INDEX)

	for(let TVA_index = 0; TVA_index < TVA_LENGTH; TVA_index++) {

		const
			ID_STR = `${TSA_UUID}-${TVA_index.toString(36).padStart(8, "0")}`
			TOKEN_STR = `id="${ID_STR}"`,
			TVA_BUF = TVA[TVA_index],
			TVA_BUF_TYPE = (
				typeof TVA_BUF == "object" &&
				typeof TVA_BUF.toString() == "symbol" &&
				TVA_BUF in window
			)
				? "POINTER"
				: "PRIMITIVE"
		;

		if(ATTR_INDEX.includes(TVA_index)) {
			BUF_STR = BUF_STR.replace(TOKEN_STR, `<span ${TOKEN_STR}></span>`);
			BUF_RESULT.push(() => {
				const TEXT_BUF = new Text();
				BASE_TEMP.querySelector(`#${ID_STR}`).replaceWith(TEXT_BUF);
				if(TVA_BUF_TYPE == "POINTER") {
					TEXT_BUF.textContent = window[TVA_BUF];
					TVA_BUF.watch(newValue => TEXT_BUF.textContent = newValue);
				} else {
					TEXT_BUF.textContent = TVA_BUF;
				}
			})
		} else {
			BUF_RESULT.push(() => {
				console.log(TVA_BUF)
				const TEMP_BUF = BASE_TEMP.querySelector(`#${ID_STR}`);
				Reflect.ownKeys(TVA_BUF).forEach(x => {
					if(typeof x == "symbol" && x in window) {
						window[x](TVA_BUF[x], TEMP_BUF);
					} else {
						TEMP_BUF[x] = TVA_BUF[x];
					}
				})

			})
		}
	}

	BASE_TEMP.innerHTML = BUF_STR;

	BUF_RESULT.forEach(x => x());

	// queueMicrotask(BASE_TEMP.remove);

	return BASE_TEMP.childNodes;

	// for(let TVA_index = 0; TVA_index < TVA_LENGTH; TVA_index++) {
	// 	const TOKEN_STR = `id="${TSA_UUID}-${TVA_index}"`;
	// 	const TEMP = BASE_TEMP.querySelector(`#${TOKEN_STR}`);
	// 	if(TEMP.hasAttribute(PLACEHOLDER_UUID)) {
	// 		const TEXT_BUFFER = new Text();
	// 		TEMP.replace(TEXT_BUFFER);
	// 		if($.isPointer(TVA[TVA_index])) {

	// 		}
	// 	} else {
	// 		TEMP
	// 	}
	// 	const TOKEN_STR = `${TSA_UUID}-${TVA_index}`;
	// 	if(ATTR_INDEX.includes(TVA_LENGTH)) {
	// 		BUF_STR = BUF_STR.replace(TOKEN_STR, `<span id="${TOKEN_STR}">`)
	// 	} else {
	// 		BASE_TEMP.querySelector(``)
	// 	}
	// }

	// 	if(test(BUF_STR)) {
	// 		BUF_STR = BUF_STR.replace
	// 	}

	// 	const
	// 		SEL_BUF = BASE_TEMP.querySelector(`[${TSA_UUID}-${TVA_index}]`),
	// 		VALUE_BUF = TVA[TVA_index]
	// 	;

	// 	if(SEL_BUF) {
	// 		// the tva is attribute object
	// 		SEL_BUF.removeAttribute(`${TSA_UUID}-${TVA_index}`);
	// 		SEL_BUF.id = `${TSA_UUID}-${TVA_index}`;
	// 		BUF_RESULT.push([true, {
	// 			value: VALUE_BUF,
	// 			callback(ref) {
	// 				Reflect.ownKeys(this.value).forEach((x, i) => {
	
	// 					const BUF_VALUE = this.value[x];
			
	// 					if(
	// 						typeof x == "symbol" &&
	// 						x in window &&
	// 						typeof window[x] == "function"
	// 					) {
	// 						window[x]?.(BUF_VALUE, ref);
	// 					} else if(
	// 						typeof x == "string"
	// 					) {
	// 						ref[x] = BUF_VALUE;
	// 					}
	// 				});
	// 			}
	// 		}]);
	// 	} else {
	// 		BUF_RESULT.push([false, VALUE_BUF]);
	// 	};

	// 	BUF_STR = BUF_STR.replace(`${TSA_UUID}-${TVA_index}`, SEL_BUF
	// 		? `id="${TSA_UUID}-${TVA_index}"`
	// 		: `<span id="${TSA_UUID}-${TVA_index}"></span>`
	// 	);



	// }

	// BASE_TEMP.innerHTML = BUF_STR;
	// BUF_RESULT.forEach((SEL_BUF, i) => {
	// 	const TEMP_BUF = BASE_TEMP.querySelector(`#${TSA_UUID}-${i}`);
	// 	if(SEL_BUF[0]) {
	// 		SEL_BUF[1].callback(TEMP_BUF);
	// 		TEMP_BUF.removeAttribute("id")
	// 	} else {
	// 		const VALUE_BUF = SEL_BUF[1];
	// 		const IS_PTR = (
	// 			typeof VALUE_BUF == "object" &&
	// 			typeof VALUE_BUF.toString() == "symbol" &&
	// 			VALUE_BUF.toString() in window
	// 		);
	// 		const TEXT_PIPE = new Text(IS_PTR
	// 			? window[SEL_BUF[1]]
	// 			: SEL_BUF[1]
	// 		);

	// 		if(IS_PTR) {
	// 			VALUE_BUF.watch(newValue => TEXT_PIPE.textContent = newValue);
	// 		}

	// 		TEMP_BUF?.replaceWith(TEXT_PIPE);
	// 	}
	// });

	// return BASE_TEMP.childNodes;
}

export { createElement }