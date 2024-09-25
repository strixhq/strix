const BUF_SIZE = 1024;
const RAND_BUF = crypto.getRandomValues(new Uint8Array(BUF_SIZE));

let index = 0;

const refreshRandBuf = (): number => (crypto.getRandomValues(RAND_BUF), index = 0)

const TEMP_BAN: number[] = [142, 158];
const TEMP: string = String.fromCharCode.apply(
	null,
	Array
		.from(
			{ length: 33 },
			(_, i): (number | boolean) => TEMP_BAN.includes(i += 127) ? false : i
		)
		.filter(Boolean) as number[]
)

const getBufferFragment = (): number => RAND_BUF[
	
	index == BUF_SIZE

		? refreshRandBuf()

		: index++

];

export const getRandom = (

	length: number = 16,

): string => Array(length)
	.fill(0)
	.map(() => TEMP[Math.floor((getBufferFragment() / 255) * 31)])
	.join("")