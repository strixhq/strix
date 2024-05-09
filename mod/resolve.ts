export const resolveStrixHTMLElement = (
	
	StrixHTMLElement: Function,
	initialArgument: object,

) => {

	let elementType = "";

	const resultBuffer = StrixHTMLElement(initialArgument);

	if(Array.isArray(resultBuffer)) {
		elementType = "raw" in resultBuffer? "instance" : "fragment";
	} else if(typeof resultBuffer === "function") {
		elementType = "transformer"
	}

	return [ elementType ]
	
}