// Pre-fetching builtin functions and classes, which reduces minified file size

const {

	Promise,
	Proxy,
	WeakMap,
	
	requestAnimationFrame,
	cancelAnimationFrame,

} = window;


const HTMLTemplateKeyMap = new WeakMap();

const HTMLTemplateMap = {};

const createHTMLTemplate = (hTempObj) => {

}

const createHTMLTemplateKey = (HTMLTemplateObj: string[]): HTMLTemplateKey => {

	const HTMLTemplateKey = HTMLTemplateObj.join('\0');
	if(!(HTMLTemplateKey in HTMLTemplateMap)) {
		HTMLTemplateMap[HTMLTemplateKey] = createHTMLTemplate(HTMLTemplateObj);
	}

	return HTMLTemplateKey;
}

const HTMLReferenceObject = new Proxy(
	({ raw }, ...val) => new Proxy(
		new Promise((resolve) => {}),
		{}
	),
	{}
);

const createHTMLInstance = (template: Function) => {

	const HTMLWriter = template(HTMLReferenceObject);
}

const createWritePathRef = () => {

};

const createWritePath = (template: Function): Function[] => {

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

const createLoop = (

	writeFn: Function,
	container: HTMLContainer,
	requestAnimationFrame: Function,
	cancelAnimationFrame: Function

): Function[] => {

	let rAFId = -1;

	const mainLoop = () => {
		rAFId = requestAnimationFrame(mainLoop);
		writeFn();
	}
	mainLoop();

	return [
		() => cancelAnimationFrame(rAFId)
	];
}

export const write = (

	container: HTMLContainer,
	template: Function

): StrixController => {

	const [ writeFn ] = createWritePath(template);
	const [ cancelLoopFn ] = createLoop(writeFn, container, requestAnimationFrame, cancelAnimationFrame);

	return {
		close() {
			cancelLoopFn();
			this.close = () => undefined;
		}
	}
};