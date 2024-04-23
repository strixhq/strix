// Pre-fetching builtin functions and classes, which reduces minified file size ;)

const {

	Array,
	Object,

	BigUint64Array,
	Promise,
	Proxy,
	RegExp,
	WeakMap,

	DragEvent,
	KeyboardEvent,
	MouseEvent,
	PointerEvent,

	crypto,

	requestAnimationFrame,
	requestIdleCallback,
	cancelAnimationFrame,

} = window;

const createPulse = (initial) => {
	return (...arg) => {
		if(arg.length) {

		}
	}
}

const createTag = (() => {

	let currentBufferIndex = 0;
	let tagBufferLength = -1;
	
	const tagBuffer = [];
	const arrayBufferMaxLength = 64;
	const baseArrayBuffer = new BigUint64Array(arrayBufferMaxLength);

	const supplyTag = () => {

		crypto.getRandomValues(baseArrayBuffer);

		Object.assign(
			tagBuffer,
			Array
				.from(baseArrayBuffer)
				.map(x => x.toString(36))
				.join("")
				.match(/.{16}/g)
		);

		tagBufferLength = tagBuffer.length;
		currentBufferIndex = 0;

	};

	supplyTag();

	return () => {

		const returnTag = tagBuffer[currentBufferIndex];

		currentBufferIndex++;

		if(currentBufferIndex === tagBufferLength) {
			supplyTag();
		}

		return returnTag;
	}
})();

const HTMLTemplateAnalyzerTag = `stval${createTag()}`;
const HTMLTemplateAnalyzerTagRegEx = new RegExp(HTMLTemplateAnalyzerTag);

const HTMLTemplateKeyMap = new WeakMap();
const HTMLTemplateMap = {};

const wrapFn = (targetFn, addFn) => {

	const target = targetFn;

	return (...arg) => {
		target(...arg);
		addFn(...arg);
	}

}

const TSAToAST = (TSA: TemplateStringsArray) => {

	const HTMLTemplateKey = HTMLTemplateKeyMap.get(TSA);
	if(!HTMLTemplateKey) {

	}
}

const createHTMLTemplate = (hTempObj) => {

}

const createHTMLTemplateKey = (HTMLTemplateObj: string[]): HTMLTemplateKey => {

	const HTMLTemplateKey = HTMLTemplateObj.join(secretTag);

	if(!(HTMLTemplateKey in HTMLTemplateMap)) {
		HTMLTemplateMap[HTMLTemplateKey] = createHTMLTemplate(HTMLTemplateObj);
		HTMLTemplateMap
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
			const HTMLTemplateKey = HTMLTemplateKeyMap.get(HTMLTemplateObject) || createHTMLTemplateKey(HTMLTemplateObject);
			const HTMLTemplate = HTMLTemplateMap[HTMLTemplateKey];
		}
	]
}

const createLoop = (

	writeFn: Function,
	container: HTMLContainer

): Function[] => {

	let rAFId = -1;

	const containerRoot = container.attatchShadow({ mode: 'close' });
	containerRoot.innerHTML = "";

	const mainLoop = () => {
		rAFId = requestAnimationFrame(mainLoop);
		writeFn();
	}

	mainLoop();

	return [
		() => {
			cancelAnimationFrame(rAFId);
			return true;
		}
	];
}

const writeOp = (

	container: HTMLContainer,
	template: Function | StrixHTMLTemplate

): StrixController => {

	let hasClosed = false;

	const [ writeFn ] = createHTMLInstance(template);
	const [ cancelLoopFn ] = createLoop(writeFn, container);

	return {
		close() {
			hasClosed = hasClosed? true : cancelLoopFn();
		}
	}
}

export const write = (

	container: HTMLContainer,
	template: Function | StrixHTMLTemplate

): StrixController => writeOp(container, template);
