import { createTag } from "./tag";

// Pre-fetching builtin functions and classes, which reduces minified file size ;)

const {

	Array,
	Object: {
		assign: OBJECT_assign,
		defineProperties: OBJECT_defineProperties
	},

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

class StrixHTMLProxy extends Promise {
	constructor(frameRefreshedCallbackFn) {
		super((resolve) => frameRefreshedCallbackFn(resolve))
	}
}

const HTMLTemplateAnalyzerTag = `stval${createTag()}`;
const HTMLTemplateAnalyzerTagRegEx = new RegExp(HTMLTemplateAnalyzerTag);

const HTMLTemplateKeyMap = new WeakMap();
const HTMLTemplateMap = {};

const HTMLWritePathMap = new WeakMap();

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

using instance = await new WorkerTemplate();