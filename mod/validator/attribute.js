import { globalGetter } from "../global"

const { Error, TypeError } = globalGetter;

export const validateStrixAttribute = (STRIX_ATTRIBUTE) => {

	const CHARCODE_CACHE = STRIX_ATTRIBUTE.name?.[0]?.charCodeAt(0);

	switch(false) {

		// StrixAttributeは関数である必要があります
		case (typeof STRIX_ATTRIBUTE === "function"): {
			throw new TypeError("Attribute must be defined with function");
		}

		// StrixHTMLElementは名前を持つ関数であるべきです
		case (CHARCODE_CACHE): {
			throw new Error("Element name invalid: must have name property");
		}

		default: {
			return true;
		}
	}
}