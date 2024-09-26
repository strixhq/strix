let index = 0;

const BUF_SIZE = 1024,
	RAND_BUF = crypto.getRandomValues(new Uint8Array(BUF_SIZE)),
	refreshRandBuf = (): number => (crypto.getRandomValues(RAND_BUF), index = 0),
	getBufferFragment = (max: number = 1): number => Math.floor(RAND_BUF[
		index == BUF_SIZE ? refreshRandBuf() : index++
	] / 255 * max),
	TEMP_CTRL: number[] = Array.from({ length: 32 }, (_, index): number => (index += 127) + Number(index >= 142) + Number(index >= 157)),
	TEMP_STR: number[] = "0123456789abcdefghijklmnopqrstuvwxyz".split("").map(x => x.charCodeAt(0)),
	getRandom = (

		length: number = 16,
		type: string = "ctrl"

	): string => String.fromCharCode.apply(null, Array
		.from(
			{ length },
			(): number =>
					type == "ctrl" 
					? TEMP_CTRL[Math.floor(getBufferFragment(32))]
					: type == "str"
					? TEMP_STR[Math.floor(getBufferFragment(36))]
					: 0
		)
	)
;

export { getRandom }