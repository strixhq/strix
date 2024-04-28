import { createTag } from "./tag";

// Pre-fetching builtin functions and classes, which reduces minified file size ;)

const {

	Object: {
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

	document,

	requestAnimationFrame,
	requestIdleCallback,
	cancelAnimationFrame,

} = window;

const main: Function = (() => {

	const resolveStrixElement: Function = (() => {

		const StrixTemplateCache = new WeakMap();
	
		const createStrixElement: Function = (() => {
	
			const resolverProcess = {
	
				function(StrixElement) {
	
				},
	
				object(StrixElement) {
	
				}
	
			};
	
			return (StrixElement, StrixTemplateCache) => {
				resolverProcess[typeof StrixElement]?.(StrixElement);
				StrixTemplateCache.set(StrixElement)
			};
		})();

		// main process

		return (StrixElement) => StrixTemplateCache.get(StrixElement) || createStrixElement(StrixElement, StrixTemplateCache);
	})();


	const baseDocumentFragment = document.createDocumentFragment().appendChild(document.createElement('div'));
	const baseCommentAnalyzer = document.createTreeWalker(baseDocumentFragment, 0x80);
	
	const HTMLTemplateAnalyzerTag = `stval${createTag()}`;
	const HTMLTemplateAnalyzerTagRegEx = new RegExp(HTMLTemplateAnalyzerTag);
	
	const AnalyzedASTKeyMap = new WeakMap();
	const AnalyzedASTMap = {};
	
	const HTMLWritePathMap = new WeakMap();
	
	const HTMLTemplateMap = new WeakMap();
	
	const wrapFn = (targetFn, addFn) => {
	
		const target = targetFn;
	
		return (...arg) => {
			target(...arg);
			addFn(...arg);
		}
	
	}
	
	const createRef = (StrixHTMLTemplate) => {
		const templateBuffer = HTMLTemplateMap.get(StrixHTMLTemplate);
	}
	
	const TSAToAST = (TSA: TemplateStringsArray) => {
	
		const HTMLTemplateKey = AnalyzedASTKeyMap.get(TSA);
		if(!HTMLTemplateKey) {
	
		}
	}
	
	const createHTMLTemplate = (hTempObj) => {
	
	}
	
	const createHTMLTemplateKey = (HTMLTemplateObj: string[]): HTMLTemplateKey => {
	
		const HTMLTemplateKey = HTMLTemplateObj.join(HTMLTemplateAnalyzerTag);
	
		if(!(HTMLTemplateKey in AnalyzedASTMap)) {
			AnalyzedASTMap[HTMLTemplateKey] = createHTMLTemplate(HTMLTemplateObj);
			AnalyzedASTMap
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
				const HTMLTemplateKey = AnalyzedASTKeyMap.get(HTMLTemplateObject) || createHTMLTemplateKey(HTMLTemplateObject);
				const HTMLTemplate = AnalyzedASTMap[HTMLTemplateKey];
			}
		]
	}
	
	const createLoop = (
	
		writeFn: Function,
		container: any
	
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

	// main process

	return (container, StrixTemplate) => {
		baseDocumentFragment.innerHTML = "";
	}

})();

export const write = (

	container: any,
	template: Function | StrixHTMLTemplate | Promise<Function | StrixHTMLTemplate>

): StrixController => main(container, template);