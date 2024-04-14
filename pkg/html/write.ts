const hTempKeyMap = new WeakMap();

const hTempMap = {};

const { requestAnimationFrame, cancelAnimationFrame } = window;

const createHTemp = (hTempObj) => {

}

const createHTempKey = (
	hTempObj: TemplateStringsArray
): string => {
	const newHTempKey = hTempObj.join('\0');
	if(newHTempKey in hTempMap) {
		hTempMap[newHTempKey] = createHTemp(hTempObj);
	}
	return newHTempKey;
}

const createPathRef = () => {

}

const createPath = (
	template: Function
): Array<Function> => {
	const pathRef = createPathRef();
	const initialWriterFn = template();
	return [
		// write
		() => {
			const hTempResult = initialWriterFn();
			const hTempObj = hTempResult[0];
			const hTempKey = hTempKeyMap.get(hTempObj) || createHTempKey(hTempObj);
			const hTemp = hTempMap[hTempKey];
		}
	]
}

export const write = (
	container: HTMLElement | DocumentFragment,
	template: Function
) => {
	let currentStrixRequestId = -1;
	const [ write ] = createPath(template);
	const writeLoop = () => {
		currentStrixRequestId = requestAnimationFrame(writeLoop);
		write();
	};
	writeLoop();
	return {
		close() {
			cancelAnimationFrame(currentStrixRequestId);
		}
	}
};