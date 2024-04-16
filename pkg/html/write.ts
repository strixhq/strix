// Pre-fetching builtin functions and classes, which reduces minified file size ;)

const {

	Promise,
	Proxy,
	WeakMap,

	Uint8Array,

	requestAnimationFrame,
	cancelAnimationFrame,
	
	BigInt,
	crypto,

} = window;

const join = 'join';
const get = 'get';
const toString = 'toString';

const SecretTag = `strix${BigInt(crypto.getRandomValues(new Uint8Array(16))[join](''))[toString](36)}`

const HTMLTemplateKeyMap = new WeakMap();

const HTMLTemplateMap = {};

const TSAToAST = (TSA: TemplateStringsArray) => {
	const HTMLTemplateKey = HTMLTemplateKeyMap[get](TSA);
	if(!HTMLTemplateKey) {

	}
}

const createHTMLTemplate = (hTempObj) => {

}

const createHTMLTemplateKey = (HTMLTemplateObj: string[]): HTMLTemplateKey => {

	const HTMLTemplateKey = HTMLTemplateObj[join](SecretTag);
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

const instacingOperations = {
	function(template: Function) {
		const HTMLWriter = template(HTMLReferenceObject);
	},
	object(template: StrixHTMLTemplate) {

	}
}

const createHTMLInstance = (template: Function | StrixHTMLTemplate) => {
	instacingOperations[typeof template]?.(template);

	return [
		// write
		() => {

		}
	]
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
			const HTMLTemplateKey = HTMLTemplateKeyMap[get](HTMLTemplateObject) || createHTMLTemplateKey(HTMLTemplateObject);
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
	template: Function | StrixHTMLTemplate

): StrixController => {

	const [ writeFn ] = createHTMLInstance(template);
	const [ cancelLoopFn ] = createLoop(writeFn, container, requestAnimationFrame, cancelAnimationFrame);

	return {
		close() {
			cancelLoopFn();
			this.close = () => undefined;
		}
	}
};