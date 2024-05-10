import { isFnAsync } from "./isfnasync";
import { Array_isArray } from "./shortened";

const getResultBuffer = async (fn, initialArgument) => isFnAsync(fn)? await fn(initialArgument) : fn(initialArgument);

export const resolveStrixHTMLElement = async (
	
	StrixHTMLElement: Function,
	initialArgument: object,

) => {

	let resultBuffer = getResultBuffer(StrixHTMLElement, initialArgument)
	
	let elementType = "";

	if(Array_isArray(resultBuffer)) {
		elementType = "raw" in resultBuffer? "instance" : "fragment";
	} else if(typeof resultBuffer === "function") {
		resultBuffer = getResultBuffer(resultBuffer, initialArgument);
		if(Array_isArray(resultBuffer)) {
			elementType = "transformer";
		} else if(typeof resultBuffer === "function") {
			resultBuffer = getResultBuffer(resultBuffer, initialArgument);
			if(Array_isArray(resultBuffer)) {
				elementType = "component";
			} else {
				throw "fucked up";	
			}	
		}
	}

	return [ elementType ]
}