import { globalGetter } from "./global.js";

const { crypto, Math_floor, Uint8Array } = globalGetter;


/**
 * 
 * @param { number } LENGTH 
 * @returns { string }
 */

export const getTag = (() => {

	const getValue = (() => {

			const MEM_SIZE = 1024;
			const BASE_ARRAYBUFFER = new Uint8Array(MEM_SIZE);

			let memIndex = MEM_SIZE;

			return () => {
				if(memIndex === MEM_SIZE) {
					crypto.getRandomValues(BASE_ARRAYBUFFER);
					memIndex = 0;
				}
				const BASE_TOKEN = BASE_ARRAYBUFFER[memIndex];
				memIndex++;

				return BASE_TOKEN / 256;
			}

		})();

	const TOKENS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	const TOKENS_LENGTH = TOKENS.length;

	return (LENGTH) => {

		let strBuffer = "";

		for(let passIndex = 0; passIndex < LENGTH; passIndex++) {
			strBuffer += TOKENS[Math_floor(getValue() * TOKENS_LENGTH)];
		}

		return strBuffer;
	}

})();