const TEMP = {
	configurable: false,
	emumerable: false
}
export const getFrozen = (target: object): object => {
	const BASE_OBJ = {};
	Reflect.ownKeys(target).forEach((targetKey: string | symbol) => {
		BASE_OBJ[targetKey] = Object.assign({ value: target[targetKey] }, TEMP)
	})
	return Object.defineProperties({}, BASE_OBJ)
}