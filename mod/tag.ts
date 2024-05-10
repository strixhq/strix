import { crypto, Math_floor, Uint8Array } from "./global.ts";

const getPass = (() => {

	const getValue = (() => {

		const memSize = 1024;
		const baseArrayBuffer = new Uint8Array(memSize);

		let count = memSize;

		return () => {
			if(count === memSize) {
				crypto.getRandomValues(baseArrayBuffer);
				count = 0;
			}
			const baseToken = baseArrayBuffer[count];
			count++;

			return baseToken / 256;
		}

	})();

	return (length) => {

		const tokens = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
		const tokensLength = tokens.length;	

		let strBuffer = "";

		for(let passIndex = 0; passIndex < length; passIndex++) {
			strBuffer += tokens[Math_floor(getValue() * tokensLength)];
		}

		return strBuffer;
	}

})();

export const createTag = (length: number): string => getPass(length)