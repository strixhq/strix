import { isFnAsync } from "./isfnasync";
import { globalGetter } from "./global";

const { Array_isArray } = globalGetter;

const getResultBuffer = async (fn, initialArgument) => isFnAsync(fn)? undefined : fn(initialArgument);

export const resolveStrixHTMLElement = async (
	
	StrixHTMLElement: Function,
	initialArgument: object,

) => {

	let resultBuffer = getResultBuffer(StrixHTMLElement, initialArgument) || Error("async will be banned"),
		elementType = "";

	if(Array_isArray(resultBuffer)) {

		elementType = "raw" in resultBuffer? "fragment" : "instance";

	} else if(typeof resultBuffer === "function") {

		resultBuffer = getResultBuffer(resultBuffer, initialArgument);

		if(Array_isArray(resultBuffer)) {

			elementType = "transformer";

		} else if(typeof resultBuffer === "function") {

			resultBuffer = getResultBuffer(resultBuffer, initialArgument);

			if(Array_isArray(resultBuffer)) {

				elementType = "component";

			} else {

				throw "too curried, we've fucked up";	

			}	
		}
	}

	return [ elementType ]
}