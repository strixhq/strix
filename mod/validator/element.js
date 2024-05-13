import { globalGetter } from "../global"

const { Error, TypeError } = globalGetter;

export const validateStrixHTMLElement = (STRIX_HTML_ELEMENT) => {

	const CHARCODE_CACHE = STRIX_HTML_ELEMENT.name[0].charCodeAt(0);

	// switch(false) によって、ケースが偽の場合のみエラーを投げます
	switch(false) {

		// StrixHTMLElementは関数である必要があります
		case (typeof STRIX_HTML_ELEMENT === "function"): {
			throw new TypeError("Element must be defined with function");
		}
		
		// StrixHTMLElementとして当てはめる関数は、nameプロパティの一文字目がアルファベットの大文字（A~Z）である必要があります
		case (65 <= CHARCODE_CACHE && CHARCODE_CACHE <= 90): {
			throw new Error("Element name invalid: must be started with uppercase");
		}

		default: {
			return true;
		}
	}
}