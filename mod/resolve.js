import { isFnAsync } from "./isfnasync";
import { globalGetter } from "./global";

const { Array_isArray } = globalGetter;

const getResultBuffer = async (fn, initialArgument) => isFnAsync(fn)? undefined : fn(initialArgument || true);

/**
	this will be executed when StrixHTMLElementMap doesn't contains target element.
 */


/**
 * 
 * @param { Function } StrixHTMLElement 
 * @param { object } initialArgument 
 * @returns 
 */
export const resolveStrixHTMLElement = async (
	
	StrixHTMLElement,
	initialArgument

) => {

	let resultBuffer = getResultBuffer(StrixHTMLElement, initialArgument),
		elementType = "";

	if(Array_isArray(resultBuffer)) {

		elementType = "raw" in resultBuffer
			? resolveAsFragment(resultBuffer, StrixHTMLElement(false))
			: (() => {
				return "instance"
			})();

	} else if(typeof resultBuffer === "function") {

		resultBuffer = getResultBuffer(resultBuffer, initialArgument);

		if(Array_isArray(resultBuffer)) {

			elementType = "transformer";

		} else if(typeof resultBuffer === "function") {

			resultBuffer = getResultBuffer(resultBuffer, initialArgument);

			if(Array_isArray(resultBuffer)) {

				elementType = "component";

			} else {

				resultBuffer = undefined;

				throw "too curried, we've fucked up";	

			}	
		}
	}

	return [ elementType ]
}