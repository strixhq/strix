import { globalGetter } from "../global"

const { Error, TypeError } = globalGetter;

export const validateStrixAttribute = (STRIX_ATTRIBUTE) => {

	switch(false) {

		// StrixAttributeは関数である必要があります
		case (typeof STRIX_ATTRIBUTE === "function"): {
			throw new TypeError("Attribute must be defined with function");
		}

		default: {
			return true;
		}
	}
}