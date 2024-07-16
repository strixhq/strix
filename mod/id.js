const memSize = 1024;
const baseArrayBuffer = new Uint8Array(memSize);

let count = memSize;

const getValue = () => {

	if(count === memSize) {
		crypto.getRandomValues(baseArrayBuffer);
		count = 0;
	}

	const baseToken = baseArrayBuffer[count];
	count++;

	return baseToken / 256;
}

export const createId = ({ length }) => {

	const tokens = "0123456789abcdefghijklmnopqrstuvwxyz"
	const tokensLength = tokens.length;

	let strBuffer = "";

	for(let passIndex = 0; passIndex < length; passIndex++) {
		strBuffer += tokens[Math.floor(getValue() * tokensLength)];
	}

	return strBuffer;

}