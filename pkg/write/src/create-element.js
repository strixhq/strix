const BASE_DF = document.createDocumentFragment();

const createElement = ([TSA, TVA]) => {

	const
		TSA_UUID = "strix-" + crypto.randomUUID(),
		TSA_LENGTH = TSA.length - 1,
		BASE_TEMP = document.createElement("div"),
		COMMENT_ARR = []
	;

	BASE_DF.appendChild(BASE_TEMP);
	
	let
		BUF_STR = BASE_TEMP.innerHTML = TSA.map((x, i) => {
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

			return x + (i == TSA_LENGTH ? "" : `${TSA_UUID}-${i}`)
		}).join(""),
		SEL_BUF,
		COMMENT_BUF
	;

	const BUF_RESULT = [];

	for(let TVA_index = 0; TVA_index < TSA_LENGTH; TVA_index++) {

		const
			SEL_BUF = BASE_TEMP.querySelector(`[${TSA_UUID}-${TVA_index}]`),
			VALUE_BUF = TVA[TVA_index]
		;

		if(SEL_BUF) {
			// the tva is attribute object
			SEL_BUF.removeAttribute(`${TSA_UUID}-${TVA_index}`);
			SEL_BUF.id = `${TSA_UUID}-${TVA_index}`;
			BUF_RESULT.push([true, {
				value: VALUE_BUF,
				callback(ref) {
					console.log(this.value)
					Reflect.ownKeys(this.value).forEach((x, i) => {
	
						const BUF_VALUE = this.value[x];

						console.log(BUF_VALUE)
			
						if(
							typeof x == "symbol" &&
							x in window &&
							typeof window[x] == "function"
						) {
							window[x]?.(BUF_VALUE, ref);
						} else if(
							typeof x == "string"
						) {
							ref[x] = BUF_VALUE;
						}
					});
				}
			}]);
		} else {
			BUF_RESULT.push([false, VALUE_BUF]);
		};

		BUF_STR = BUF_STR.replace(`${TSA_UUID}-${TVA_index}`, SEL_BUF
			? `id="${TSA_UUID}-${TVA_index}"`
			: `<span id="${TSA_UUID}-${TVA_index}"></span>`
		);

	}

	console.log(BUF_STR)

	BASE_TEMP.innerHTML = BUF_STR;
	BUF_RESULT.forEach((SEL_BUF, i) => {
		const TEMP_BUF = BASE_TEMP.querySelector(`#${TSA_UUID}-${i}`);
		if(SEL_BUF[0]) {
			console.log(SEL_BUF[1])
			SEL_BUF[1].callback(TEMP_BUF);
			TEMP_BUF.removeAttribute("id")
		} else {
			const VALUE_BUF = SEL_BUF[1];
			const IS_PTR = (
				typeof VALUE_BUF == "object" &&
				typeof VALUE_BUF.toString() == "symbol" &&
				VALUE_BUF.toString() in window
			);
			const TEXT_PIPE = new Text(IS_PTR
				? window[SEL_BUF[1]]
				: SEL_BUF[1]
			);

			if(IS_PTR) {
				VALUE_BUF.watch(newValue => TEXT_PIPE.textContent = newValue);
			}

			TEMP_BUF?.replaceWith(TEXT_PIPE);
		}
	});

	return BASE_TEMP;
}

export { createElement }