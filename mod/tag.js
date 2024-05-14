import { crypto, Math_floor, Uint8Array } from "./global.js";

const MEM_SIZE = 1024;
const BASE_ARRAYBUFFER = new Uint8Array(MEM_SIZE);

let memIndex = MEM_SIZE;

const createValue = () => {

	if(memIndex >= MEM_SIZE) {
		crypto.getRandomValues(BASE_ARRAYBUFFER);
		memIndex = 0;
	}
	const BASE_TOKEN = BASE_ARRAYBUFFER[memIndex];
	memIndex++;

	return BASE_TOKEN / 256;
}

/**
 * 
 * @param { number } [TAG_LENGTH] 
 * @param { string } [TOKENS]
 * @returns { string }
 */

export const createTag = (

	TAG_LENGTH = 16,
	TOKENS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

) => {

	const TOKENS_LENGTH = TOKENS.length;

	let strBuffer = "";

	for(let passIndex = 0; passIndex < TAG_LENGTH; passIndex++) {
		strBuffer += TOKENS[Math_floor(createValue() * TOKENS_LENGTH)];
	}

	return strBuffer;
}