/**
 * @typedef { HTMLElement | DocumentFragment } HTMLContainer
 */

const HTMLTemplateKeyMap = new WeakMap();

const HTMLTemplateMap = {};

const createHTMLTemplate = (hTempObj) => {

}

/**
 * 
 * @param { TemplateStringsArray } HTMLTempObj 
 * @returns { string }
 */

const createHTMLTemplateKey = (HTMLTempObj) => {
	const HTMLTempKey = HTMLTempObj.join('\0');
	if(HTMLTempKey in HTMLTemplateMap) {
		HTMLTemplateMap[HTMLTempKey] = createHTMLTemplate(HTMLTempObj);
	}
	return HTMLTempKey;
}

const createWritePathRef = () => {

}

/**
 * 
 * @param { Function } template 
 * @returns { Function[] }
 */

const createWritePath = (template) => {
	const pathRef = createWritePathRef();
	const initialWriterFn = template();
	return [
		// write
		() => {
			const HTMLTemplateResult = initialWriterFn();
			const HTMLTemplateObject = HTMLTemplateResult[0];
			const HTMLTemplateKey = HTMLTemplateKeyMap.get(HTMLTemplateObject) || createHTMLTemplateKey(HTMLTemplateObject);
			const HTMLTemplate = HTMLTemplateMap[HTMLTemplateKey];
		}
	]
}

/**
 * 
 * @param { Function } writeFn 
 * @param { HTMLContainer } container
 * @param { Function } requestAnimationFrame 
 * @param { Function } cancelAnimationFrame
 * @returns { Function }
 */

const createLoop = (writeFn, container, requestAnimationFrame, cancelAnimationFrame) => {
	let rAFId = -1;
	const mainLoop = () => {
		rAFId = requestAnimationFrame(mainLoop);
		writeFn();
	}
	mainLoop();
	return () => cancelAnimationFrame(rAFId);
}

/**
 * 
 * @param { HTMLContainer } container 
 * @param { Function } template 
 * @returns { { close: Function } }
 */

export const write = (container, template) => {

	const [ writeFn ] = createWritePath(template);

	const cancelLoopFn = createLoop(writeFn, container, window.requestAnimationFrame, window.cancelAnimationFrame);

	return {
		close() {
			cancelLoopFn();
			delete this.close;
		}
	}
};