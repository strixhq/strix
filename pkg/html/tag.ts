let currentBufferIndex = 0;
let tagBufferLength = -1;

let tagBuffer: Array = [];
const arrayBufferMaxLength = 64;
const baseArrayBuffer = new BigUint64Array(arrayBufferMaxLength);

const supplyTag = () => {

	crypto.getRandomValues(baseArrayBuffer);

	tagBuffer = [...baseArrayBuffer].map(x => x.toString(36)).join("").match(/.{16}/g);

	tagBufferLength = tagBuffer.length;
	currentBufferIndex = 0;

};

supplyTag();

export const createTag = () => {

	const returnTag = tagBuffer[currentBufferIndex];

	currentBufferIndex++;

	if(currentBufferIndex === tagBufferLength) {
		supplyTag();
	}

	return returnTag;
}