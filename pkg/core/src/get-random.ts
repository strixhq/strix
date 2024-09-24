const BUF_SIZE = 1024;
const RAND_BUF = crypto.getRandomValues(new Uint32Array(BUF_SIZE / 4));

let index = 0;

const getBufferFragment = (): number => RAND_BUF[
	
	index == BUF_SIZE

		? ((): number => {
			crypto.getRandomValues(RAND_BUF);
			return index = 0;
		})()

		: index++

];

export const random = (

	length: number = 16,
	type: string = "string",
	sample: string = "0123457689abcdefghijklmnopqrstuvwxyz",
	sampleLength: number = sample.length,

): string => {
	const result = Array(length)
		.fill(0)
		.map(getBufferFragment)
	;

	return type == "string"
		? result.map(x => sample[x / (2 ^ 32) * sampleLength]).join("")
		: type == "charcode"
		? String.fromCharCode(...result)
		: ""
}