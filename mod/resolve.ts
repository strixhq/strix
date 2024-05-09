const {
	Array: {
		isArray: ARRAY_isArray
	}
} = window;

export const resolveStrixHTMLElement = (
	
	StrixHTMLElement: StrixHTMLElement,
	initialArgument: object,

) => {

	let depth = -1;

	for(let i = 0; i < 2; i++) {
		const resultBuffer = StrixHTMLElement(initialArgument);
		if(ARRAY_isArray(resultBuffer)) {
			if("raw" in resultBuffer) {

			}
		}
	}
}