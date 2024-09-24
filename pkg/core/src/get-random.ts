const BUF_SIZE = 1024;
const RAND_BUF = crypto.getRandomValues(new Uint8Array(BUF_SIZE));

let index = 0;

const refreshRandBuf = (): number => (crypto.getRandomValues(RAND_BUF), index = 0)

const getBufferFragment = (): number => RAND_BUF[
	
	index == BUF_SIZE

		? refreshRandBuf()

		: index++

];

export const getRandom = (

	length: number = 16,

): string => String.fromCharCode.apply(null, Array(length).fill(0).map(getBufferFragment))